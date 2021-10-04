import random
import string
import os
from django.conf import settings


def id_generator(size=5, chars=string.ascii_uppercase + string.digits):
    return "".join(random.choice(chars) for x in range(size))


def deletePathImage(tab, key):
    # je remplace media par le vide car dans settings.MEDIA_ROOT nous avons deja /media
    # efface les images
    for fil in tab:
        if os.path.exists(settings.MEDIA_ROOT + fil[key].replace('/media', '')):
            os.remove(settings.MEDIA_ROOT + fil[key].replace('/media', ''))
        else:
            pass