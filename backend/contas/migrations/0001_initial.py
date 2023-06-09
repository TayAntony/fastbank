# Generated by Django 4.2 on 2023-05-17 00:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('rua', models.CharField(max_length=100)),
                ('numero', models.IntegerField()),
                ('bairro', models.CharField(max_length=100)),
                ('cidade', models.CharField(max_length=100)),
                ('estado', models.CharField(choices=[('AC', 'Acre'), ('AL', 'Alagoas'), ('AP', 'Amapa'), ('AM', 'Amazonas'), ('BA', 'Bahia'), ('CE', 'Ceara'), ('ES', 'Espírito Santo'), ('GO', 'Goiás'), ('MA', 'Maranhão'), ('MT', 'Mato Grosso'), ('MS', 'Mato Grosso do Sul'), ('MG', 'Minas Gerais'), ('PA', 'Pará'), ('PR', 'Paraná'), ('PB', 'Paraíba'), ('PE', 'Pernambuco'), ('PI', 'Piaui'), ('RJ', 'Rio de Janeiro'), ('RN', 'Rio Grande do Norte'), ('RS', 'Rio Grande do Sul'), ('RO', 'Rondônia'), ('RR', 'Roraima'), ('SP', 'São Paulo'), ('SC', 'Santa Catarina'), ('SE', 'Sergipe'), ('TO', 'Tocantins'), ('DF', 'Distrito Federal')], default='SP', max_length=2)),
                ('complemento', models.CharField(max_length=100)),
                ('cep', models.CharField(max_length=8)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('nome_cliente', models.CharField(max_length=100)),
                ('cpf_cnpj', models.CharField(max_length=20, unique=True)),
                ('data_nascimento_criacao', models.DateField()),
                ('foto', models.ImageField(upload_to='foto_perfil')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Cartao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_cartao', models.CharField(blank=True, max_length=20, null=True)),
                ('cvv', models.IntegerField(blank=True, null=True)),
                ('data_vencimento', models.DateField(blank=True, null=True)),
                ('bandeira', models.CharField(blank=True, max_length=20, null=True)),
                ('cartao_ativo', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'Cartao',
            },
        ),
        migrations.CreateModel(
            name='ClienteConta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Conta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_conta', models.CharField(choices=[('CC', 'Conta Corrente'), ('CS', 'Conta Salário'), ('CP', 'Conta Poupança')], default='CC', max_length=2)),
                ('numero_conta', models.IntegerField()),
                ('agencia', models.IntegerField()),
                ('digito', models.IntegerField()),
                ('saldo', models.IntegerField()),
                ('data_criacao', models.DateField(auto_now=True)),
                ('conta_ativa', models.BooleanField()),
            ],
            options={
                'verbose_name_plural': 'Conta',
            },
        ),
        migrations.CreateModel(
            name='Contatos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_telefone', models.IntegerField()),
                ('email', models.EmailField(max_length=254)),
                ('observacao', models.CharField(max_length=255)),
            ],
            options={
                'verbose_name_plural': 'Contatos',
            },
        ),
        migrations.CreateModel(
            name='Endereco',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rua', models.CharField(max_length=100)),
                ('numero', models.IntegerField()),
                ('bairro', models.CharField(max_length=100)),
                ('cidade', models.CharField(max_length=100)),
                ('estado', models.CharField(choices=[('AC', 'Acre'), ('AL', 'Alagoas'), ('AP', 'Amapa'), ('AM', 'Amazonas'), ('BA', 'Bahia'), ('CE', 'Ceara'), ('ES', 'Espírito Santo'), ('GO', 'Goiás'), ('MA', 'Maranhão'), ('MT', 'Mato Grosso'), ('MS', 'Mato Grosso do Sul'), ('MG', 'Minas Gerais'), ('PA', 'Pará'), ('PR', 'Paraná'), ('PB', 'Paraíba'), ('PE', 'Pernambuco'), ('PI', 'Piaui'), ('RJ', 'Rio de Janeiro'), ('RN', 'Rio Grande do Norte'), ('RS', 'Rio Grande do Sul'), ('RO', 'Rondônia'), ('RR', 'Roraima'), ('SP', 'São Paulo'), ('SC', 'Santa Catarina'), ('SE', 'Sergipe'), ('TO', 'Tocantins'), ('DF', 'Distrito Federal')], default='SP', max_length=2)),
                ('complemento', models.CharField(max_length=100)),
                ('cep', models.CharField(max_length=8)),
            ],
            options={
                'verbose_name_plural': 'Endereço',
            },
        ),
        migrations.CreateModel(
            name='Movimentacao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_hora', models.DateTimeField(auto_now=True)),
                ('operacao', models.CharField(choices=[('D', 'Operação de débito'), ('C', 'Operação de crédito'), ('T', 'Operação de transferência')], default='D', max_length=1)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
                ('codigo_cartao', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='contas.cartao')),
            ],
        ),
        migrations.CreateModel(
            name='Investimento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aporte', models.DecimalField(decimal_places=2, max_digits=10)),
                ('rentabilidade', models.DecimalField(decimal_places=2, max_digits=10)),
                ('finalizado', models.BooleanField()),
                ('codigo_conta', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='contas.conta')),
            ],
        ),
        migrations.CreateModel(
            name='Emprestimo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_solicitacao', models.DateField()),
                ('valor_solicitado', models.DecimalField(decimal_places=2, max_digits=10)),
                ('juros', models.DecimalField(decimal_places=2, max_digits=10)),
                ('aprovado', models.BooleanField()),
                ('numero_parcela', models.IntegerField()),
                ('data_aprovacao', models.DateField()),
                ('observacao', models.TextField()),
                ('codigo_conta', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='contas.conta')),
            ],
        ),
        migrations.AddConstraint(
            model_name='contatos',
            constraint=models.UniqueConstraint(fields=('email',), name='unique_contato_user'),
        ),
        migrations.AddField(
            model_name='clienteconta',
            name='codigo_conta',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='contas.conta'),
        ),
        migrations.AddField(
            model_name='cartao',
            name='conta_cartao',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contas.conta'),
        ),
        migrations.AddField(
            model_name='cartao',
            name='titular_cartao',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
        migrations.AddConstraint(
            model_name='cartao',
            constraint=models.UniqueConstraint(fields=('numero_cartao',), name='unique_numero_cartao'),
        ),
    ]
