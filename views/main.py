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
from datetime import date,datetime, timedelta

from google.appengine.ext.webapp import template
from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import ndb

from models.models import *

import webapp2
from webapp2_extras import sessions

reload(sys)  
sys.setdefaultencoding('utf8')

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__).replace("views","")),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True,
)



class CharruaM(webapp2.RequestHandler):
    def get(self, idd):
        try:
            print idd
            hoy = date.today()
            try:
                data = News3.query(
                    News3.key == ndb.Key(News3, int(idd)),
                )
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
            #hora = time - timedelta(hours=3)

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

            template = JINJA_ENVIRONMENT.get_template('/templates/mono5.html')
            self.response.write(template.render(template_values))
        except:
            error = traceback.format_exc()
            print error
            template_values = {
                'error': error,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono5.html')
            self.response.write(template.render(template_values))


class Charrua(webapp2.RequestHandler):
    '''  '''
    def get(self):
        try:
            import sys
            reload(sys)  
            sys.setdefaultencoding('utf8')
            hoy = date.today()
            try:
                query = News3.query(
                    News3.date == hoy,
                    News3.news_from.IN([
                        #"montevideo_com",
                        #"ciento_ochenta",
                        "el_pais",
                        "la_diaria",
                        #"lr21",
                    ]),
                    #News3.category == "salud",
                    News3.id.IN([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,24,25]),
                ).order(News3.id)

            except:
                error = traceback.format_exc()
                template_values = {
                    'error': error,                
                }
                template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
                self.response.write(template.render(template_values))

            #hoy = hoy.isoformat()
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
                #clima = Yahoo()
                #cli = clima.get()
                pass
            except: cli = ""

            template_values = {
                'data': query,
                #'clima': cli,
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
            print(JINJA_ENVIRONMENT)
            template_values = {
                'error': error,                
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
            self.response.write(template.render(template_values))


class CharruaOnLoad(webapp2.RequestHandler):
    '''  '''
    def get(self):
        try:
            import sys
            reload(sys)  
            sys.setdefaultencoding('utf8')
            hoy = date.today()
            try:
                query = News3.query(
                    News3.date == hoy,
                    News3.news_from.IN([
                        #"montevideo_com",
                        #"ciento_ochenta",
                        "el_pais",
                        #"uy_press",
                        #"lr21",
                    ]),
                    #News3.category == "politica",
                    News3.id.IN([0,1,2,3,4,5,6,7,8,9,10,11,12,
                        13,14,15,16]),
                ).order(News3.id).order(-News3.created)
            except:
                error = traceback.format_exc()
                template_values = {
                    'error': error,                
                }
                template = JINJA_ENVIRONMENT.get_template('/templates/mono4.html')
                self.response.write(template.render(template_values))

            template_values = {
                'data': query,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono4.html')
            self.response.write(template.render(template_values))
        
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,                
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono4.html')
            self.response.write(template.render(template_values))


class CharruaOnLoad2(webapp2.RequestHandler):
    '''  '''
    def get(self):
        try:
            import sys
            reload(sys)  
            sys.setdefaultencoding('utf8')
            hoy = date.today()
            try:
                query = News3.query(
                    News3.date == hoy,
                    News3.news_from.IN([
                        #"montevideo_com",
                        #"ciento_ochenta",
                        "el_pais",
                        #"uy_press",
                        #"lr21",
                    ]),
                    #News3.category == "politica",
                    News3.id.IN([17,18,19,20,21,22,23,24,25,26,27,28,29,30,
                        31,32,33,34,35,36,37,38,39,40]),
                ).order(News3.id).order(-News3.created)

            except:
                error = traceback.format_exc()
                template_values = {
                    'error': error,                
                }
                template = JINJA_ENVIRONMENT.get_template('/templates/mono4.html')
                self.response.write(template.render(template_values))

            template_values = {
                'data': query,
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono4.html')
            self.response.write(template.render(template_values))
        
        except:
            error = traceback.format_exc()
            template_values = {
                'error': error,                
            }
            template = JINJA_ENVIRONMENT.get_template('/templates/mono4.html')
            self.response.write(template.render(template_values))





