# Generated by Django 4.2 on 2023-05-23 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contas', '0006_remove_movimentacao_codigo_cartao_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conta',
            name='saldo',
            field=models.IntegerField(default=1200),
        ),
    ]
