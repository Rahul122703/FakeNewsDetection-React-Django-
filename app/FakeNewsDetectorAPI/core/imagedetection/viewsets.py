from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ImageDetectionSerializer
from core.model import load_models
import cv2
import numpy as np
import mahotas
import os
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

class ImageDetectionViewSet(viewsets.ViewSet):
    """Viewset to handle image uploads for fake image detection."""
    http_method_names = ('post', )
    serializer_class = ImageDetectionSerializer
    nb_model, vect_model, img_model = load_models()

    def extract_features(self, image_path):
        """Extracts texture features from an image."""
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        image = cv2.resize(image, (256, 256))
        features = mahotas.features.haralick(image).mean(axis=0)
        return features

    def create(self, request):
        """Handles image upload and returns predicted value."""
        serializer = ImageDetectionSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data['image']
            file_path = default_storage.save(f"uploads/{image.name}", ContentFile(image.read()))
            
            # Extract features
            features = self.extract_features(file_path)
            prediction = self.img_model.predict([features])[0]
            result = "Fake" if prediction == 1 else "Real"

            response_data = {'prediction': result}
            return Response(response_data)
        else:
            return Response(serializer.errors, status=400)
