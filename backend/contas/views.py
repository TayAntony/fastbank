from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from .serializer import *
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import IsAuthenticated
import random


def gerar_conta():
    conta = str(random.randint(10000, 99999))
    agencia = str(random.randint(1000, 9999))
    digito = random.randint(0, 9)
    return conta, agencia, digito


@api_view(["POST"])
def criar_conta(request: Request):
    id_user = request.data["id"]
    conta_num, agencia, digito = gerar_conta()

    try:
        user = User.objects.get(pk=id_user)

        conta = Conta(user=user, numero_conta=conta_num, agencia=agencia, digito=digito)
        conta.save()

        conta_serializada = ContaSerializer(conta)

        return Response(
            {"mensagem": "Criei a conta com sucesso", "conta": conta_serializada.data},
            status=status.HTTP_200_OK,
        )
    except User.DoesNotExist:
        return Response(
            {"erro": "nao existe user com esse id cara"},
            status=status.HTTP_400_BAD_REQUEST,
        )

def gerar_cartao():
    numero_cartao = f"{random.randint(1000, 9999)},{random.randint(1000, 9999)},{random.randint(1000, 9999)},{random.randint(1000, 9999)}"
    cvv = str({randint(100, 999)})
    data_vencimento = f"{randint(1,12)}/{randint(datetime.today().year + 8)}"
    bandeira = "Mastercard"
    print(numero_cartao, cvv, data_vencimento, bandeira)


@api_view(["POST"])
def criar_cartao(request:Request):
    id_user = request.data["id"]
    numero_cartao, cvv, data_vencimento, bandeira = gerar_cartao()

    try:
    user = User.


# CLIENTE VIEWSET
class ClienteViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = User.objects.all()
    serializer_class = ClienteSerializer


# CONTA VIEWSET
class ContaViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = Conta.objects.all()
    serializer_class = ContaSerializer


# CONTATO VIEWSET
class ContatoViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = Contatos.objects.all()
    serializer_class = ContatosSerializer

    def list(self, request, *args, **kwargs):
        token = request.META.get("HTTP_AUTHORIZATION", "").split(" ")[
            1
        ]  # separa o token JWT '34frdf3145fd4322' para verificar de quem aquele token pertence

        dados = AccessToken(token)
        usuario = dados[
            "user_id"
        ]  # com base no id do usuário que fez a requisição é possível fazer consultas

        return super().list(request, *args, **kwargs)


# CARTAO VIEWSET
class CartaoViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = Cartao.objects.all()
    serializer_class = CartaoSerializer


# MOVIMENTACAO VIEWSET
class MovimentacaoViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer


# EMPRESTIMO VIEWSET
class EmprestimoViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = Emprestimo.objects.all()
    serializer_class = EmprestimoSerializer


# INVESTIMENTO VIEWSET
class InventarioViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated, )
    queryset = Investimento.objects.all()
    serializer_class = InvestimentoSerializer


@api_view(["POST"])
def login(request):
    email = request.data.get("login")
    senha = request.data.get("senha")
    user = authenticate(request, username=email, password=senha)

    if user is not None:
        token = AccessToken.for_user(user)
        return Response({"token": str(token)})
    else:
        return Response(
            {"error": "Credenciais inválidas."}, status=status.HTTP_401_UNAUTHORIZED
        )
