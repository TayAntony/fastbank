# Generated by Django 4.2.1 on 2023-05-23 01:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('contas', '0005_cartao_nome_alter_cartao_data_vencimento'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='movimentacao',
            name='codigo_cartao',
        ),
        migrations.AddField(
            model_name='movimentacao',
            name='conta_recv',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='recv', to='contas.conta'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='movimentacao',
            name='conta_sender',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='sender', to='contas.conta'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='movimentacao',
            name='operacao',
            field=models.CharField(choices=[('D', 'Operação de débito'), ('C', 'Operação de crédito'), ('T', 'Operação de transferência')], default='T', max_length=1),
        ),
    ]
