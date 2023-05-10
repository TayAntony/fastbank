from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()

router.register('clientes', views.ClienteViewSet)
router.register('cartao', views.CartaoViewSet)

urlpatterns = [
    path('api/login/', views.login, name='login'),
] + router.urls