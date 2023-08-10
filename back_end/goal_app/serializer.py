from rest_framework import serializers
from .models import Goal

class RunSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    def get_user_name(self, obj):
        user = obj.user  
        if user:
            return user.display_name 
        return None
    class Meta:
        model = Goal
        fields = ['id', 'distance', 'time', 'user_name']