from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()

router.register("conta", views.ContaViewSet)
router.register("cartao", views.CartaoViewSet)
router.register("contato", views.ContatoViewSet)
router.register("emprestimo", views.EmprestimoViewSet)
router.register("movimentacao", views.ContatoViewSet)

urlpatterns = [
    path("api/login/", views.login, name="login"),
    path("create-conta/", views.criar_conta, name="criar_conta"),
] + router.urls
