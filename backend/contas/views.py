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
            status=status.HTTP_201_CREATED,
        )
    except User.DoesNotExist:
        return Response(
            {"erro": "nao existe user com esse id"},
            status=status.HTTP_400_BAD_REQUEST,
        )


def gerar_cartao():
    numero_cartao = f"{random.randint(1000, 9999)} {random.randint(1000, 9999)} {random.randint(1000, 9999)} {random.randint(1000, 9999)}"
    cvv = random.randint(100, 999)
    data_vencimento_mes = random.randint(1,12)
    data_vencimento_ano = str(datetime.today().year + 8)[-2:]
    bandeira = "Mastercard"
    return numero_cartao, cvv, data_vencimento_mes,data_vencimento_ano, bandeira


@api_view(["POST"])
def criar_cartao(request: Request):
    id_user = request.data["id"]
    numero_cartao, cvv, data_vencimento_mes, data_vencimento_ano, bandeira = gerar_cartao()

    try:
        user = User.objects.get(pk=id_user)

        conta = Conta.objects.get(user=user)

        cartao = Cartao(
            conta_cartao=conta,
            numero_cartao=numero_cartao,
            cvv=cvv,
            data_vencimento_mes=data_vencimento_mes,
            data_vencimento_ano=data_vencimento_ano,
            bandeira=bandeira,
            titular_cartao=user,
            nome=user.nome_cliente,
        )
        cartao.save()

        cartao_serializado = CartaoSerializer(cartao)

        return Response(
            {
                "mensagem": "Cartao criado com sucesso",
                "cartao": cartao_serializado.data,
            },
            status=status.HTTP_201_CREATED,
        )
    except User.DoesNotExist:
        return Response(
            {"erro": "Nao existe usuário com este id"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        print(e)
        return Response(
            {"erro": "Erro interno do servidor"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

@api_view(["GET"])
def info_conta(request: Request):
    agencia = request.query_params.get("agencia")
    numero_conta = request.query_params.get("numero_conta")
    

    if agencia == None or numero_conta == None:
        return Response(
            {"erro" : "Precisa-se de dois parâmetros: agencia e conta"}, status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        conta = Conta.objects.get(numero_conta=numero_conta, agencia=agencia)
        return Response(
            {"nome" : conta.user.nome_cliente}, status=status.HTTP_200_OK
        )
        
    except Conta.DoesNotExist:
        return Response(
            {"erro": "Conta que você está tentando enviar não existe"},
            status=status.HTTP_404_NOT_FOUND,
        )


@api_view(["POST"])
def movimentacao(request: Request):
    id_conta_sender = request.data["id_conta_sender"]
    numero_conta = request.data["numero_conta"]
    agencia = request.data["agencia"]
    valor = int(request.data["valor"])

    try:
        conta_sender = Conta.objects.get(pk=id_conta_sender)
        conta_recv = Conta.objects.get(numero_conta=numero_conta, agencia=agencia)

        if conta_sender.saldo < valor:
            return Response(
                {"erro": "Saldo insuficiente"}, status=status.HTTP_403_FORBIDDEN
            )

        conta_sender.saldo -= valor
        conta_recv.saldo += valor

        conta_sender.save()
        conta_recv.save()

        movimentacao = Movimentacao(
            conta_sender=conta_sender, conta_recv=conta_recv, valor=valor
        )
        movimentacao.save()

        movimentacao_serializada = MovimentacaoSerializer(movimentacao)

        return Response(
            {
                "mensagem": "Movimentação realizada com sucesso",
                "movimentacao": movimentacao_serializada.data,
            },
            status=status.HTTP_202_ACCEPTED,
        )
    except Conta.DoesNotExist:
        return Response(
            {"erro": "Conta que você está tentando enviar não existe"},
            status=status.HTTP_404_NOT_FOUND,
        )
    

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

    def retrieve(self, request, pk=None):
        user = User.objects.get(pk=pk)
        return super().retrieve(request, user=user)


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
