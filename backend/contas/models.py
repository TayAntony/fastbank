from django.db import models
from random import randint
from datetime import datetime
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from .managers import ClienteManager
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
import random
import string

# 10.109.72.4:8000 IP SENAI

class User(AbstractUser):
    ACRE = "AC"
    ALAGOAS = "AL"
    AMAPA = "AP"
    AMAZONAS = "AM"
    BAHIA = "BA"
    CEARA = "CE"
    ESPIRITO_SANTO = "ES"
    GOIAS = "GO"
    MARANHAO = "MA"
    MATO_GROSSO = "MT"
    MATO_GROSSO_SUL = "MS"
    MINAS_GERAIS = "MG"
    PARA = "PA"
    PARANA = "PR"
    PARAIBA = "PB"
    PERNAMBUCO = "PE"
    PAIUI = "PI"
    RIO_DE_JANEIRO = "RJ"
    RIO_GRANDE_NORTE = "RN"
    RIO_GRANDE_SUL = "RS"
    RONDONIA = "RO"
    RORAIMA = "RR"
    SAO_PAULO = "SP"
    SANTA_CATARINA = "SC"
    SERGIPE = "SE"
    TOCANTINS = "TO"
    DISTRITO_FEDERAL = "DF"

    ESTADOS = [
        (ACRE, "Acre"),
        (ALAGOAS, "Alagoas"),
        (AMAPA, "Amapa"),
        (AMAZONAS, "Amazonas"),
        (BAHIA, "Bahia"),
        (CEARA, "Ceara"),
        (ESPIRITO_SANTO, "Espírito Santo"),
        (GOIAS, "Goiás"),
        (MARANHAO, "Maranhão"),
        (MATO_GROSSO, "Mato Grosso"),
        (MATO_GROSSO_SUL, "Mato Grosso do Sul"),
        (MINAS_GERAIS, "Minas Gerais"),
        (PARA, "Pará"),
        (PARANA, "Paraná"),
        (PARAIBA, "Paraíba"),
        (PERNAMBUCO, "Pernambuco"),
        (PAIUI, "Piaui"),
        (RIO_DE_JANEIRO, "Rio de Janeiro"),
        (RIO_GRANDE_NORTE, "Rio Grande do Norte"),
        (RIO_GRANDE_SUL, "Rio Grande do Sul"),
        (RONDONIA, "Rondônia"),
        (RORAIMA, "Roraima"),
        (SAO_PAULO, "São Paulo"),
        (SANTA_CATARINA, "Santa Catarina"),
        (SERGIPE, "Sergipe"),
        (TOCANTINS, "Tocantins"),
        (DISTRITO_FEDERAL, "Distrito Federal"),
    ]


    rua = models.CharField(max_length=100, blank=True, null=True)
    numero = models.IntegerField(blank=True, null=True)
    bairro = models.CharField(max_length=100, blank=True, null=True)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    estado = models.CharField(
        max_length=2, choices=ESTADOS, default=SAO_PAULO, blank=True, null=True
    )
    complemento = models.CharField(max_length=100, blank=True, null=True)
    cep = models.CharField(max_length=8)

    username = None
    email = models.EmailField(_("email address"), unique=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    nome_cliente = models.CharField(max_length=100)
    cpf_cnpj = models.CharField(max_length=11, unique=True)
    data_nascimento_criacao = models.DateField()
    foto = models.ImageField(upload_to="foto_perfil", blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "nome_cliente",
        "cpf_cnpj",
        "data_nascimento_criacao",
        "cep",
    ]

    objects = ClienteManager()

    def __str__(self):
        return self.email


class Contatos(models.Model):
    numero_telefone = models.IntegerField()
    email = models.EmailField()
    observacao = models.CharField(max_length=255)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["email"],
                name="unique_contato_user",
            )
        ]
        verbose_name_plural = "Contatos"


class Conta(models.Model):
    SALDO_ALEATORIO = random.randint(1000, 5000)
    CONTA_CORRENTE = "CC"
    CONTA_SALARIO = "CS"
    CONTA_POUPANCA = "CP"

    TIPO_CONTA = [
        (CONTA_CORRENTE, "Conta Corrente"),
        (CONTA_SALARIO, "Conta Salário"),
        (CONTA_POUPANCA, "Conta Poupança"),
    ]

    SALDO_ALEATORIO = random.randint(1000, 5000)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tipo_conta = models.CharField(
        max_length=2, choices=TIPO_CONTA, default=CONTA_CORRENTE
    )
    numero_conta = models.IntegerField()
    agencia = models.IntegerField()
    digito = models.IntegerField()
    saldo = models.IntegerField(default=(SALDO_ALEATORIO))
    data_criacao = models.DateField(auto_now=True)
    conta_ativa = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Conta"

    def __str__(self) -> str:
        return self.numero_conta


class Cartao(models.Model):
    numero_cartao = models.CharField(max_length=20, blank=True, null=True)
    conta_cartao = models.ForeignKey(Conta, on_delete=models.CASCADE)
    cvv = models.IntegerField(blank=True, null=True)
    data_vencimento = models.CharField(max_length=10)
    nome = models.CharField(max_length=100)
    bandeira = models.CharField(max_length=20, blank=True, null=True)
    titular_cartao = models.ForeignKey(User, on_delete=models.CASCADE)
    cartao_ativo = models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["numero_cartao"],
                name="unique_numero_cartao",
            )
        ]
        verbose_name_plural = "Cartao"


class Movimentacao(models.Model):
    DEBITO = "D"
    CREDITO = "C"
    TRANSFERENCIA = "T"

    TIPO_OPERACAO = [
        (DEBITO, "Operação de débito"),
        (CREDITO, "Operação de crédito"),
        (TRANSFERENCIA, "Operação de transferência"),
    ]

    conta_sender = models.ForeignKey(
        Conta, on_delete=models.CASCADE, related_name="sender"
    )
    conta_recv = models.ForeignKey(Conta, on_delete=models.CASCADE, related_name="recv")
    data_hora = models.DateTimeField(auto_now=True)
    operacao = models.CharField(
        max_length=1, choices=TIPO_OPERACAO, default=TRANSFERENCIA
    )
    valor = models.DecimalField(max_digits=10, decimal_places=2)


class Emprestimo(models.Model):
    codigo_conta = models.ForeignKey(Conta, on_delete=models.DO_NOTHING)
    data_solicitacao = models.DateField()
    valor_solicitado = models.DecimalField(max_digits=10, decimal_places=2)
    juros = models.DecimalField(max_digits=10, decimal_places=2)
    aprovado = models.BooleanField()
    numero_parcela = models.IntegerField()
    data_aprovacao = models.DateField()
    observacao = models.TextField()


class Investimento(models.Model):
    codigo_conta = models.ForeignKey(Conta, on_delete=models.DO_NOTHING)
    aporte = models.DecimalField(max_digits=10, decimal_places=2)
    rentabilidade = models.DecimalField(max_digits=10, decimal_places=2)
    finalizado = models.BooleanField()


class ClienteConta(models.Model):
    codigo_conta = models.ForeignKey(Conta, on_delete=models.DO_NOTHING)
