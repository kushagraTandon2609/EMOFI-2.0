import json
import os
import time
import yt_dlp


# ==========================================
# PATHS
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SONGS_FILE = os.path.join(
    BASE_DIR,
    "data",
    "songs.json"
)

FAILED_FILE = os.path.join(
    BASE_DIR,
    "data",
    "youtube_failed.json"
)


# ==========================================
# LOAD SONGS
# ==========================================

with open(
    SONGS_FILE,
    "r",
    encoding="utf-8"
) as file:

    songs_data = json.load(file)


# ==========================================
# YOUTUBE OPTIONS
# ==========================================

ydl_opts = {
    "quiet": True,
    "no_warnings": True,
    "skip_download": True,
    "extract_flat": True,
}


# ==========================================
# SEARCH YOUTUBE
# ==========================================

def find_youtube_id(title, artist):

    query = f"{title} {artist} official audio"

    print(f"   🔎 Searching: {query}")

    try:

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:

            result = ydl.extract_info(
                f"ytsearch1:{query}",
                download=False
            )

        entries = result.get("entries", [])

        if not entries:
            return None

        video = entries[0]

        video_id = video.get("id")

        if video_id:
            return video_id

    except Exception as error:

        print(
            f"   ❌ Search failed: {error}"
        )

    return None


# ==========================================
# PROCESS
# ==========================================

total = 0
already_done = 0
added = 0
failed = 0

failed_songs = []


for emotion, categories in songs_data.items():

    print("\n" + "=" * 60)
    print(f"EMOTION: {emotion.upper()}")
    print("=" * 60)

    if not isinstance(categories, dict):
        continue

    for category, songs in categories.items():

        print(
            f"\n🎵 CATEGORY: {category.upper()}"
        )

        for song in songs:

            total += 1

            title = song.get("title", "").strip()
            artist = song.get("artist", "").strip()

            # --------------------------------
            # Already has ID
            # --------------------------------

            if song.get("youtubeId"):

                already_done += 1

                print(
                    f"   ✅ Already exists: "
                    f"{title}"
                )

                continue

            # --------------------------------
            # Missing data
            # --------------------------------

            if not title or not artist:

                failed += 1

                failed_songs.append({
                    "title": title,
                    "artist": artist,
                    "reason": "Missing title or artist"
                })

                continue

            # --------------------------------
            # Search
            # --------------------------------

            youtube_id = find_youtube_id(
                title,
                artist
            )

            if youtube_id:

                song["youtubeId"] = youtube_id

                added += 1

                print(
                    f"   🎯 FOUND: "
                    f"{youtube_id}"
                )

            else:

                failed += 1

                failed_songs.append({
                    "title": title,
                    "artist": artist,
                    "reason": "YouTube video not found"
                })

                print(
                    f"   ⚠️ NOT FOUND"
                )

            # Don't hammer YouTube
            time.sleep(1)


# ==========================================
# SAVE UPDATED SONGS
# ==========================================

with open(
    SONGS_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        songs_data,
        file,
        indent=2,
        ensure_ascii=False
    )


# ==========================================
# SAVE FAILED SONGS
# ==========================================

with open(
    FAILED_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        failed_songs,
        file,
        indent=2,
        ensure_ascii=False
    )


# ==========================================
# SUMMARY
# ==========================================

print("\n")
print("=" * 60)
print("🎵 EMOFI YOUTUBE ID POPULATION COMPLETE")
print("=" * 60)

print(f"Total songs       : {total}")
print(f"Already had ID    : {already_done}")
print(f"New IDs added     : {added}")
print(f"Failed            : {failed}")

print("=" * 60)

print(
    f"\nUpdated file:"
    f"\n{SONGS_FILE}"
)

print(
    f"\nFailed songs:"
    f"\n{FAILED_FILE}"
)