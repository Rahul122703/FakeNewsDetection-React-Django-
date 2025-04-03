from rest_framework import serializers

class ImageDetectionSerializer(serializers.Serializer):
    """Serializes the uploaded image."""
    image = serializers.ImageField()
    
    class Meta:
        fields = ['image', ]
