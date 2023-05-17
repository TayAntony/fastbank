from rest_framework import serializers
from .models import *
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer


class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = (
            "id",
            "nome_cliente",
            "cpf_cnpj",
            "email",
            "data_nascimento_criacao",
            "password",
            "username",
            "cep",
        )


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["usuario", "senha"]


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "nome_cliente",
            "cpf_cnpj",
            "foto",
            "data_nascimento_criacao",
            "usuario",
            "rua",
            "numero",
            "bairro",
            "cidade",
            "estado",
            "complemento",
            "cep",
        ]


class ContaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conta
        fields = [
            "id",
            "tipo_conta",
            "numero_conta",
            "agencia",
            "digito",
            "saldo",
            "data_criacao",
            "conta_ativa",
        ]


class CartaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cartao
        fields = [
            "numero_cartao",
            "conta_cartao",
            "cvv",
            "data_vencimento",
            "bandeira",
            "titular_cartao",
            "cartao_ativo",
        ]


class MovimentacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimentacao
        fields = ["codigo_cartao", "data_hora", "operacao", "valor"]


class EmprestimoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Emprestimo
        fields = [
            "codigo_conta",
            "data_solicitacao",
            "valor_solicitado",
            "juros",
            "aprovado",
            "numero_parcela",
            "data_aprovacao",
            "observacao",
        ]


class InvestimentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investimento
        fields = ["codigo_conta", "aporte", "rentabilidade", "finalizado"]


class ContatosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contatos
        fields = ["codigo_cliente", "numero_telefone", "email", "observacao"]
