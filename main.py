# -*- coding: utf-8 -*-
from __future__ import absolute_import
import sys
import cgi
import os
import re
import json
import webapp2
import jinja2
import traceback
import urllib, urllib2
import time
import logging
from datetime import date,datetime, timedelta

from google.appengine.ext.webapp import template
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import ndb
from google.appengine.ext import gql
from google.appengine.api import mail

import webapp2
from webapp2_extras import sessions

from bs4 import BeautifulSoup

from views.charrua.elpais import Elpais
from views.charrua.elpais2 import Elpais2
from views.charrua.elobservador import ElObservador
from views.charrua.selector import Select
from views.charrua.montevideo_com import MontevideoCom
from views.charrua.ciento_ochenta import CientoOchenta
from views.charrua.uy_press import UyPress, UypressM, UypressPolitica, UypressEconomia, UypressDeportes
from views.charrua.lr21 import Lr21
from views.charrua.la_republica import LaRepublica
from views.charrua.la_diaria import LaDiaria
from views.charrua.la_diaria import LaDiaria2
from views.charrua.clima import Yahoo, Clima
from views.charrua.subrayado import Subrayado, SubrayadoMain
from views.main import *



from views.classification.testclassifier import TestClassifier

from views.delete_news.delete import *
from views.cron.cron import *

from views.htmltotext.htmltotext3 import HtmlToTextMain
from views.htmltotext.htmltotext4 import HtmlToTextMain as HtmlToTextMain2

from views.category.category import CategoryMain
from views.otrosine.otrosine import Otrosine
#from views.charrua.gsearch import Gsearch
import sys
reload(sys)  
sys.setdefaultencoding('utf8')

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True,
)


def handle_404(request, response, exception):
    template = JINJA_ENVIRONMENT.get_template('/templates/404.html')
    request.response.write(template.render(locals()))
def handle_500(request, response, exception):
    logging.exception(exception)
    response.write('A server error occurred!')
    response.set_status(500)


class Production(webapp2.RequestHandler):
    '''  '''
    def get(self):
        try:
            hoy = date.today()

            last = NewsSelect2.query(
                NewsSelect2.date == hoy,
            ).order(-NewsSelect2.id)

            old = NewsSelect2.query(
                NewsSelect2.date == hoy - timedelta(days = 1),
            ).order(-NewsSelect2.id)

            query3 = News3.query(
                News3.date == hoy,
                News3.news_from.IN(["montevideo_com","el_observador","el_pais","uy_press","ciento_ochenta"]),
                News3.in_use == False,
            ).order(-News3.id)
            query4 = News3.query(
                News3.date == hoy,
                #News.news_from.IN(["montevideo_com","el_observador","el_pais"]),
                News3.in_use == False,
            ).order(News3.id)

            #tam = todo.count()
            #mi_tam = tam/2

            #query3 = todo.fetch(mi_tam)
            #query4 = todo_o.fetch(mi_tam)
            
            #hoy = hoy.isoformat()
            dia = hoy.strftime('%d')
            mes= hoy.strftime('%m')
            year= hoy.strftime('%Y')

            template_values = {
                'data': query3,
                #'data2': old,
                #'data3': query3,
                #'data4': query4,
                #'clima': cli,
                'dia': dia,
                'mes': mes,
                'year': year,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono.html')
            self.response.write(template.render(template_values))
        
        except:
            print traceback.format_exc()
            

class DeleteNewsSelect(webapp2.RequestHandler):
    '''  '''
    def get(self):
        hoy = date.today()
        f = NewsSelect2.query(
            NewsSelect2.date == hoy,
        ).fetch()
        for i in f:
            i.key.delete()

        clima = Clima()
        cli = clima.get()
        
        return webapp2.redirect('/in_use')
        template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
        self.response.write(template.render(locals()))


class DeleteNews(webapp2.RequestHandler):
    '''  '''
    def get(self):
        hoy = date.today()
        f = News.query(
            News.date == hoy,
        ).fetch()
        for i in f:
            i.key.delete()

        template_values = {
            'data': f,
            'fecha': hoy,
            #'data3': data3,
        }
        template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
        self.response.write(template.render(template_values))


class Observador(webapp2.RequestHandler):
    def get(self):
        try:
            #o = ElObservador()
            #o = o.get()

            hoy = date.today()

            data = News3.query(
                News3.date == hoy,
                News3.news_from == "el_observador",
            )

            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(locals()))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(locals()))


class Montevideo(webapp2.RequestHandler):
    def get(self):
        try:
            #o = MontevideoCom()
            #o = o.get()
            
            hoy = date.today()
            try:
                data = News3.query(
                    News3.date == hoy,
                    News3.news_from == "montevideo_com",
                )
            except:
                print traceback.format_exc()


            dia = hoy.strftime('%d')
            mes= hoy.strftime('%m')
            year= hoy.strftime('%Y')
            week_day = datetime.today().weekday()
            days_week = ["Lunes","Martes","MiÃ©rcoles","Jueves","Viernes","SÃ¡bado","Domingo"]
            week_day = days_week[week_day]
            hora = hoy - timedelta(hours=3)
            hora = hora.strftime("%H:%M:%S")

            try:
                clima = Yahoo()
                cli = clima.get()
            except: cli = ""

            template_values = {
                'data': data,
                'clima': cli,
                'dia': dia,
                'mes': mes,
                'year': year,
                'week_day': week_day,
                'hora':hora,
            }

            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))


class Lr21M(webapp2.RequestHandler):
    def get(self):
        try:
            #o = Lr21()
            #o = o.get()
            
            hoy = date.today()
            try:
                data = News3.query(
                    News3.date == hoy,
                    News3.news_from == "lr21",
                )
            except:
                print traceback.format_exc()


            dia = hoy.strftime('%d')
            mes= hoy.strftime('%m')
            year= hoy.strftime('%Y')
            week_day = datetime.today().weekday()
            days_week = ["Lunes","Martes","MiÃ©rcoles","Jueves","Viernes","SÃ¡bado","Domingo"]
            week_day = days_week[week_day]
            hora = hoy - timedelta(hours=3)
            hora = hora.strftime("%H:%M:%S")

            try:
                clima = Yahoo()
                cli = clima.get()
            except: cli = ""

            template_values = {
                'data': data,
                'clima': cli,
                'dia': dia,
                'mes': mes,
                'year': year,
                'week_day': week_day,
                'hora':hora,
            }

            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))
        

class Elpai(webapp2.RequestHandler):
    def get(self):
        try:
            
            hoy = date.today()
            try:
                data = News3.query(
                    News3.date == hoy,
                    News3.news_from == "el_pais",
                ).order(News3.id).order(-News3.created)
            except:
                print traceback.format_exc()


            dia = hoy.strftime('%d')
            mes= hoy.strftime('%m')
            year= hoy.strftime('%Y')
            week_day = datetime.today().weekday()
            days_week = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]
            week_day = days_week[week_day]
            hoy = datetime.now() 
            hora = datetime(hoy.year, hoy.month, hoy.day, hoy.hour, hoy.minute, hoy.second) - timedelta(hours=3)
            hora = hora.strftime("%H:%M:%S")

            try:
                clima = Yahoo()
                cli = clima.get()
            except: cli = ""

            template_values = {
                'data': data,
                'clima': cli,
                'dia': dia,
                'mes': mes,
                'year': year,
                'week_day': week_day,
                'hora':hora,
            }

            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))


class LaDiariaMostrar(webapp2.RequestHandler):
    def get(self):
        try:
            
            hoy = date.today()
            try:
                data = News3.query(
                    News3.date == hoy,
                    News3.news_from == "la_diaria",
                ).order(News3.id).order(-News3.created)
            except:
                print traceback.format_exc()


            dia = hoy.strftime('%d')
            mes= hoy.strftime('%m')
            year= hoy.strftime('%Y')
            week_day = datetime.today().weekday()
            days_week = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]
            week_day = days_week[week_day]
            hoy = datetime.now() 
            hora = datetime(hoy.year, hoy.month, hoy.day, hoy.hour, hoy.minute, hoy.second) - timedelta(hours=3)
            hora = hora.strftime("%H:%M:%S")

            try:
                clima = Yahoo()
                cli = clima.get()
            except: cli = ""

            template_values = {
                'data': data,
                'clima': cli,
                'dia': dia,
                'mes': mes,
                'year': year,
                'week_day': week_day,
                'hora':hora,
            }

            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))


class CientoOchen(webapp2.RequestHandler):
    def get(self):
        try:
            #c = CientoOchenta()
            #o = c.cientoochenta()
            
            hoy = date.today()
            try:
                data = News3.query(
                    News3.date == hoy,
                    News3.news_from == "ciento_ochenta",
                )
            except:
                print traceback.format_exc()


            dia = hoy.strftime('%d')
            mes= hoy.strftime('%m')
            year= hoy.strftime('%Y')
            week_day = datetime.today().weekday()
            days_week = ["Lunes","Martes","MiÃ©rcoles","Jueves","Viernes","SÃ¡bado","Domingo"]
            week_day = days_week[week_day]
            hora = hoy - timedelta(hours=3)
            hora = hora.strftime("%H:%M:%S")

            try:
                clima = Yahoo()
                cli = clima.get()
            except: cli = ""

            template_values = {
                'data': data,
                'clima': cli,
                'dia': dia,
                'mes': mes,
                'year': year,
                'week_day': week_day,
                'hora':hora,
            }

            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))


class ChangeInUse(webapp2.RequestHandler):
    '''  '''
    def get(self):
        hoy = date.today()
        f = News3.query(
            News3.date == hoy,
            News3.in_use == True,
        ).fetch()
        for i in f:
            i.in_use = False
            i.put()


        return webapp2.redirect('/cron/select')

        template_values = {
            'data': f,
            'd': hoy,
            #'data3': data3,
        }
        template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
        self.response.write(template.render(template_values))


class Google(webapp2.RequestHandler):
    def get(self):
        
        template = JINJA_ENVIRONMENT.get_template('/templates/googlea6bed3b812c0e8c8.html')
        self.response.write(template.render(locals()))


class HtmlToTextView(webapp2.RequestHandler):
    def get(self):
        try:
            #print "hello"
            c = HtmlToTextMain2()
            page = "https://www.elpais.com.uy/sabado-show/pasarela-inclusiva.html"
            o = c.main(page)

            template_values = {
                'data': o,
                
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/profile2.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))


class Robots(webapp2.RequestHandler):
    def get(self):
        try:
            template = JINJA_ENVIRONMENT.get_template('/templates/robots.txt')
            self.response.write(template.render(locals()))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
            self.response.write(template.render(template_values))


class Sitemap(webapp2.RequestHandler):
    def get(self):
        try:
            template = JINJA_ENVIRONMENT.get_template('/templates/sitemap.xml')
            self.response.write(template.render(locals()))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
            self.response.write(template.render(template_values))


class OtroSine(webapp2.RequestHandler):
    def get(self):
        try:
            template = JINJA_ENVIRONMENT.get_template('/templates/otrosine/index.html')
            self.response.write(template.render(locals()))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
            self.response.write(template.render(template_values))


class Comentarios(webapp2.RequestHandler):
    def get(self):
        try:
            from google.appengine.ext import ndb
            from models.models import Comentarios
            edit = Comentarios.query().order(-Comentarios.created)
            template_values = {
                'comentarios': edit,
            }

            template = JINJA_ENVIRONMENT.get_template('/templates/comentarios.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
            self.response.write(template.render(template_values))

    def post(self):
        try:
            from google.appengine.ext import ndb
            from models.models import Comentarios

            nombre = self.request.POST["nombre"]
            email = self.request.POST["email"]
            comentario = self.request.POST["comentario"]

            sav = Comentarios(
                nombre = nombre,
                email = email,
                comentario = comentario,
            )
            sav.put()
            time.sleep(1)

            edit = Comentarios.query().order(-Comentarios.created)
            
            print "   "
            print nombre
            print "   "
            template_values = {
                'comentarios': edit,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/comentarios.html')
            self.response.write(template.render(template_values))

        except:
            print traceback.format_exc()
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
            self.response.write(template.render(template_values))


class ComentariosArticulo(webapp2.RequestHandler):
    def get(self):
        try:
            from google.appengine.ext import ndb
            from models.models import Comentarios
            edit = Comentarios.query().order(-Comentarios.created)
            template_values = {
                'comentarios': edit,
            }

            template = JINJA_ENVIRONMENT.get_template('/templates/comentarios.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
            self.response.write(template.render(template_values))

    def post(self):
        try:
            

            nombre = self.request.POST["nombre"]
            email = self.request.POST["email"]
            comentario = self.request.POST["comentario"]

            sav = Comentarios(
                nombre = nombre,
                email = email,
                comentario = comentario,
            )
            sav.put()
            time.sleep(1)

            edit = Comentarios.query().order(-Comentarios.created)
            
            print "   "
            print nombre
            print "   "
            template_values = {
                'comentarios': edit,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/comentarios.html')
            self.response.write(template.render(template_values))

        except:
            print traceback.format_exc()
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/index.html')
            self.response.write(template.render(template_values))


class TestHtml(webapp2.RequestHandler):
    def get(self):
        try:
            #o = ElObservador()
            #o = o.get()

            hoy = date.today()

            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(locals()))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(locals()))


class ElpaisTalCualEs(webapp2.RequestHandler):
    def get(self):
        try:
            print "     "
            print "    _ "
            print "       "
            print "  hello "
            print "  _____ "
            print "     "
            c = HtmlToTextMain2()
            page = "http://www.elpais.com.uy/"
            o = c.main(page)

            template_values = {
                'data': o,
                
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/profile2.html')
            self.response.write(template.render(template_values))
        except:
            print "  os  "
            oso = os.path.dirname(__file__)
            oso2 = str(oso).replace("views\\elpais"," ")

            print oso2
            #print str(oso2).replace("\\"," ", -1)
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))

    def post(self):
        try:
            print "     "
            print "          _____________        "
            print "     "
            print "  hello to heaven my dumb mind"
            print "  ____________________________ "
            print "     "

            post_values = self.request.POST["url"]
            print post_values

            c = HtmlToTextMain2()
            o = c.main(post_values)

            template_values = {
                'data': o,
                
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/profile2.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))


class LaDiariaTalCualEs(webapp2.RequestHandler):
    def get(self):
        try:
            hoy = date.today()
            try:
                data = News3.query(
                    News3.date == hoy,
                    News3.news_from == "la_diaria",
                ).order(News3.id).order(-News3.created)
            except:
                print traceback.format_exc()
        
            template_values = {
                'data': data,
            }

            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))


        except:
            print "  os  "
            oso = os.path.dirname(__file__)
            oso2 = str(oso).replace("views\\elpais"," ")

            print oso2
            #print str(oso2).replace("\\"," ", -1)
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))

    def post(self):
        try:
            print "hello to heaven my dumb mind"
            post_values = self.request.POST["url"]
            print post_values

            c = HtmlToTextMain2()
            o = c.main(post_values)

            template_values = {
                'data': o,
                
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/profile2.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))


class Politica(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('/templates/politica.html')
        self.response.write(template.render(locals()))



config = {}
config['webapp2_extras.sessions'] = {
    'secret_key': 'fuck you!!!',
}

app = webapp2.WSGIApplication([
    ('/', Charrua),
    ('/(\d+)', CharruaM),
    ('/on_load', CharruaOnLoad),
    ('/on_load2', CharruaOnLoad2),
    ('/cron/select', Select),
    # cron
    #('/cron/horoscopo', CronHoroscopo),
    ('/cron/el_pais', CronElpais),
    ('/cron/ciento_ochenta', CronCientoochenta),
    ('/cron/lr21', CronLr21),
    ('/cron/montevideo_com', CronMontevideocom),
    ('/cron/uy_press', CronUyPress),
    ('/cron/el_observador', CronElObservador),
    ('/cron/subrayado', SubrayadoMain),
    ('/cron/la_diaria', LaDiaria),
    ('/cron', Cron),
    # fin cron
    ('/delete/charrua/newsselect', DeleteNewsSelect),
    ('/delete/montevideo_com', DeleteMontevideoCom),
    ('/delete/uy_press', DeleteUyPress),
    ('/delete/el_observador', DeleteElObservador),
    ('/delete/ciento_ochenta', DeleteCientoOchenta),
    ('/delete/el_pais', DeleteElPais),
    ('/delete/subrayado', DeleteSubrayado),
    ('/delete/la_diaria', DeleteLaDiaria),
    ('/delete/news', DeleteNews),
    
    #('/delete/horoscopo', DeleteHoroscopo),
    ('/el_observador', Observador),
    ('/montevideo_com', MontevideoCom),
    ('/ciento_ochenta', CientoOchen),
    ('/el_pais', Elpai),
    ('/elpais/', ElpaisTalCualEs),
    ('/ladiaria/', LaDiariaTalCualEs),
    ('/la_republica', LaRepublica),
    ('/uy_press', UypressM),
    ('/uy_press/(\d+)', UypressM),
    ('/uy_press/politica', UypressPolitica),
    ('/uy_press/economia', UypressEconomia),
    ('/uy_press/deportes', UypressDeportes),
    ('/subrayado', Subrayado),
    ('/la_diaria', LaDiariaMostrar),
    ('/in_use', ChangeInUse),
    #('/all', Sentiment_text),
    #('/horoscopo', HoroscopoM),
    ('/lr21', Lr21M),
    ('/googlea6bed3b812c0e8c8',Google),
    ('/googlea6bed3b812c0e8c8.html',Google),
   
    ('/robots.txt', Robots),
    ('/robots', Robots),
    ('/sitemap', Sitemap),
    ('/sitemap.xml', Sitemap),
    ('/category', CategoryMain),
    #('/portadas', Portadas),
    #('/subportadas', SubPortadas),
    #('/deportes', Deportes),
    #('/politica', Politica),
    #('/clima', ClimaM),
    ('/ml', TestClassifier),
    ('/html', HtmlToTextView),
    ('/otrosine', OtroSine),
    ('/otrosine/nosotros', Otrosine),
    ('/comentarios/', Comentarios),
    ('/politica-de-privacidad/', Politica)

    #('/comentarios-articulo/', ComentariosArticulo)
    #('/test-html', TestHtml),
    #servicios informaticos
    #ventas sinfor-uruguay.com
    #('/email', ConfirmUserSignup),
], config=config, debug=False)


app.error_handlers[404] = handle_404
app.error_handlers[500] = handle_500


def main():
    run_wsgi_app(app)

if __name__ == "__main__":
    main()
