from models.user import User


class ProfileService:

    def get_profile(self, user_id):

        user = User.query.get(user_id)

        if not user:
            return None

        return {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }


profile_service = ProfileService()