# Generated by Django 4.2 on 2023-05-25 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contas', '0010_alter_conta_saldo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conta',
            name='saldo',
            field=models.IntegerField(default=3000),
        ),
    ]
