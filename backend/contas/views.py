
from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import *
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.permissions import IsAuthenticated
import random
import datetime
# Create your views here.

def gerar_agencia():
    while True:
        agencia = str(random.randint(1000, 9999))
        if not Conta.objects.filter(agencia=agencia).exists():
            print(agencia)
            return agencia

#CLIENTE VIEWSET
class ClienteViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    
    def criar_conta(request):
        agencia = gerar_agencia()
        digito = random.randint(0, 9)
        data_criacao = datetime.date.today()
        conta_ativa = True
        conta = Conta(agencia=agencia, digito=digito, data_criacao = data_criacao, conta_ativa = conta_ativa)
         
        conta.save()


#CONTA VIEWSET
class ContaViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Conta.objects.all()
    serializer_class = ContaSerializer

#CARTAO VIEWSET
class CartaoViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Cartao.objects.all()
    serializer_class = CartaoSerializer

#MOVIMENTACAO VIEWSET
class MovimentacaoViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Movimentacao.objects.all()
    serializer_class = MovimentacaoSerializer

#EMPRESTIMO VIEWSET
class EmprestimoViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Emprestimo.objects.all()
    serializer_class = EmprestimoSerializer

#INVESTIMENTO VIEWSET
class InventarioViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    queryset = Investimento.objects.all()
    serializer_class = InvestimentoSerializer

@api_view(['POST'])
def login(request):
    email = request.data.get('login')
    senha = request.data.get('senha')
    user = authenticate(request, username=email, password=senha)
  
    if user is not None:
        token = AccessToken.for_user(user)
        return Response({'token': str(token)})
    else:
        return Response({'error': 'Credenciais inválidas.'}, status=status.HTTP_401_UNAUTHORIZED)