from rest_framework import serializers
from .models import Race

class RaceSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    def get_user_name(self, obj):
        user = obj.user  
        if user:
            return user.display_name 
        return None
    class Meta:
        model = Race
        fields = ['id','name', 'distance', 'city','race_id', 'state', 'zipcode', 'user_name', 'url', 'next_end_date']


      