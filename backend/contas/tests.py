from django.test import TestCase
from .models import Conta
from .views import gerar_agencia

class GerarAgenciaTestCase(TestCase):
    def test_agencia_unico(self):
        # Cria 10 contas bancárias com agências aleatórias
        for i in range(10):
            conta = Conta(agencia=gerar_agencia())
            conta.save()
        # Testa se as 10 contas têm agências únicas
        agencias = [conta.agencia for conta in Conta.objects.all()]
        self.assertEqual(len(set(agencias)), 10)

# Create your tests here.
