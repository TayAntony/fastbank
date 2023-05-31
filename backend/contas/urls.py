from django.urls import path
from rest_framework import routers
from . import views

router = routers.SimpleRouter()

router.register("conta", views.ContaViewSet)
router.register("cartao", views.CartaoViewSet)
router.register("contato", views.ContatoViewSet)
router.register("emprestimo", views.EmprestimoViewSet)

urlpatterns = [
    path("create-conta/", views.criar_conta, name="criar_conta"),
    path("create-cartao/", views.criar_cartao, name="criar_cartao"),
    path("movimentacao/", views.movimentacao, name="movimentacao"),
    path("info-conta/", views.info_conta, name="info_conta"),
    path("extrato/", views.ver_movimentacoes, name="ver_movimentacoes" )
] + router.urls
