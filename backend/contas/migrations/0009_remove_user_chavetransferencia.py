# Generated by Django 4.2 on 2023-05-25 16:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contas', '0008_user_chavetransferencia_alter_user_cpf_cnpj'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='chaveTransferencia',
        ),
    ]
