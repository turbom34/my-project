"""Fixed the Models.PY

Revision ID: d7140b846360
Revises: 14be061fb051
Create Date: 2023-04-17 16:49:07.860920

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd7140b846360'
down_revision = '14be061fb051'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_password_hash', sa.String(length=150), nullable=True))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=150), nullable=True))
        batch_op.drop_column('_password_hash')

    # ### end Alembic commands ###
