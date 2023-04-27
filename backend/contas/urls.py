from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()
router.register('clientes', views.ClienteViewSet)

urlpatterns = [
    path('api/login/', views.login, name='login'),
]