from rest_framework import routers
from core.usercheckbytitle.viewsets import UserCheckViewSet
from core.livenews.viewsets import LiveNewsPrediction, LiveNewsByCategory
from core.imagedetection.viewsets import detectionImage

router = routers.SimpleRouter()

router.register(r'usercheck/title', UserCheckViewSet, basename='game')
router.register(r'live', LiveNewsPrediction, basename='live')
router.register(r'image', LiveNewsPrediction, basename='live')
router.register(r'category/(?P<category>[^/.]+)', LiveNewsByCategory, basename='livenews-by-category')

urlpatterns = [
    *router.urls,
]