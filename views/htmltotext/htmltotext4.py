# -*- coding: utf-8 -*-
import html2text
import urllib, urllib2, re
import codecs
import webapp2
import StringIO
import jinja2
import traceback
import urllib, urllib2
import httplib
import time, os
import requests
import requests_toolbelt.adapters.appengine
from bs4 import BeautifulSoup

from views.category.category import keywordExtract

# Use the App Engine Requests adapter. This makes sure that Requests uses
# URLFetch.
requests_toolbelt.adapters.appengine.monkeypatch()


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__).replace("views/otrosine","")),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True,
)


class HtmlToTextMain(webapp2.RequestHandler):
    ''' '''
    def init(self):
        page = "http://www.elpais.com.uy/informacion/lacalle-guerrilla-tupamara-provoco-dictadura.html"
        page = "http://www.elpais.com.uy/"
        o = main(page)

        template_values = {
            'data2': o,
            
        }
        template = JINJA_ENVIRONMENT.get_template('/templates/mono2.html')
        self.response.write(template.render(template_values))

    def main(self, page):
        hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
           'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
           'Accept-Encoding': '*',
           'Accept-Language': 'es-ES,en;q=0.8',
           'Connection': 'keep-alive'}

        #age = "http://www.elpais.com.uy/mundo/actor-flamante-presidente-ucrania-asumio-hoy-disolvio-parlamento.html"
        #page = "http://www.lr21.com.uy/politica/1400838-astori-guerra-comercial-eeuu-china-economia-uruguaya"
        #page = "https://ladiaria.com.uy/articulo/2019/5/el-cierre-de-game-of-thrones/"
        #page = "https://www.google.com/search?q=salah"
        #page = "https://ladiaria.com.uy/articulo/2019/5/seminario-para-emprendimientos-deportivos-y-estudios-sobre-ajedrez/"
        #page = "https://www.teledoce.com/programas/desayunos-informales/primera-manana/mayra-arena-la-joven-argentina-que-hablo-sobre-su-vida-en-la-pobreza-y-se-hizo-escuchar-uno-puede-salir-de-la-pobreza-pero-la-pobreza-no-sale-de-uno/"
        #page = "https://www.ovaciondigital.com.uy/futbol/reciente-campeon-integrado-celeste-suma-ocho.html"
        #page = "http://www.lr21.com.uy/tecnologia/1399334-rusia-vladimir-putin-internet-soberana-control-estatal-kremlin-acceso-informacion"
        #page = "https://ladiaria.com.uy/articulo/2019/5/grecia-tsipras-pidio-adelanto-de-elecciones-luego-de-derrota-en-comicios-europeos/"
        #page = "https://www.montevideo.com.uy/Mujer/La-soledad-no-deseada-un-factor-de-riesgo-para-el-desarrollo-de-demencia-uc719653"
        #page = "https://findesemana.ladiaria.com.uy/articulo/2019/5/fucvam-celebro-sus-49-anos/"
        #page = "https://findesemana.ladiaria.com.uy/articulo/2019/5/foro-web-larranaga-logro-su-plebiscito-y-pedira-una-cadena-de-radio-y-tv/"
        #page = "https://www.buscapalabra.com/definiciones.html?palabra=%C3%BAltimos"
        #page = "https://www.bbc.com/mundo/noticias-internacional-48481839"
        #page = "https://ladiaria.com.uy/feeds/articulos/"
        #page = "http://www.elpais.com.uy/tvshow/personajes/transformacion-fernando-tetes.html" 
        #page = "https://www.tvshow.com.uy/personajes/mina-bonino-embarazada-valverde.html?utm_source=related-tags"
        #page = "http://www.elpais.com.uy/tvshow/libros/martin-cirio-habla-libro-criticas-mensaje-exito-faraona.html"
        #page = "https://www.brou.com.uy/c/portal/render_portlet?p_l_id=20593&p_p_id=cotizacionfull_WAR_broutmfportlet_INSTANCE_otHfewh1klyS&p_p_lifecycle=0&p_t_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=0&p_p_col_count=2&p_p_isolated=1&currentURL=%2Fcotizaciones"
        #page = "https://www.elpais.com.uy/informacion/politica/mides-presento-datos-oficiales-hay-vez-gente-durmiendo-calles.html"
        #page = "https://www.elpais.com.uy/sabado-show/pasarela-inclusiva.html"

        proxies = {
            "http": 'http://185.13.32.86:8085', 
            "http": 'http://185.223.160.205:8085'
        }

        #r = requests.get(
        #    page,
        #    headers = hdr,
        #    proxies = proxies
        #)

        print "-------- requests html2text4 --------"
        #print [r.text]
        #sys.exit()
        try:
            if "/personajes/" in page:
                page = "http://www.tvshow.com.uy/" + page
            elif "elpais.com.uy" in page:
                page = page
            else:
                page = "http://www.elpais.com.uy/" + page
        except:
            print traceback.format_exc()
            page = "http://www.elpais.com.uy/"

        print page
            
        try:    
            req = urllib2.Request(page, headers=hdr)
            pages = urllib2.urlopen(req)
            content = pages.read()
        except:
            print traceback.format_exc()

        page = page
        #text = html2text.html2text(content.decode('utf8'))
        #pdb.set_trace()
        text = html2text.HTML2Text()
        text.lastWasList = True
        text.ignore_links = True
        text.skip_internal_links = True
        text.escape_snob = True
        text.re_space = True
        text.escape_all = True
        text.re_ordered_list_matcher = True
        text.re_unordered_list_matcher = True
        text.store_true = True
        text.list_indent = False
        text.ignore_emphasis = True
        text.manage_ul = True

        
        #print [content.decode('utf8')]
        #soup = BeautifulSoup(content, "html.parser")
        #sop = soup.find_all("div",attrs={"class": "r"})
        #sop = sop[0].find_all("a")
        #print sop[0]["href"]
        #print sop[1]

        #f = open("el_pais_index.html","w+")
        #f.write(content.decode('utf8'))
        print "    "
        print "-------------------  start text handle  --------------------"
        print "    "
        return content.decode('utf8')



        try:
            text = text.handle(content.decode('utf8'))
        except UnicodeDecodeError:
            text = text.handle(content.decode("ISO-8859-1"))

        print "    "
        print "-------------------  end text handle  --------------------"
        print "    "
        print [text]
        print "    "

        output = StringIO.StringIO()
        output.write(text)
        contents = output.getvalue()
        output.close()
        startWith = False
        space = 0
        def string_stream(s, separators="\n"):
            start = 0
            for end in range(len(s)):
                if s[end] in separators:
                    yield s[start:end]
                    start = end + 1
            if start < end:
                yield s[start:end+1]
                #print text
        stream = string_stream(contents)
        s = ""
        c = 0
        count_br = 0
        l = []
        se = []
        for line in stream:
            li=line
            #
            if len(li.encode("utf-8")) == 0: count_br += 1
            if len(li.encode("utf-8")) == 0 and count_br > 2: continue
            if len(li.encode("utf-8")) != 0 and count_br > 2: count_br = 0
            #print [li]
            #print len(li.encode("utf-8"))
            if len(li.encode("utf-8").split(" ")) > 7:
                l.append(
                    {"text":li.encode("utf-8"),
                    "size":len(li.encode("utf-8")),
                    "keys": li.encode("utf-8").split(" ")
                    }
                )
                se.append(len(li.encode("utf-8")))
                #print str(li)
                #print li.isspace()
                #print li == "\n"
                #print count_br

                if True:
                    try:
                        s = s + li.encode('latin-1').decode('utf-8') + "<br>"
                    except (UnicodeEncodeError, UnicodeDecodeError):
                        s = s + li.decode('utf-8') + "<br>"
                    c += 1
                else: 
                    if li.isspace() and c > 1: c = 0 
                    else: s = s + li.encode('latin-1').decode('utf-8')
            else: pass
            #s = s + "<br>"
                
            
        print [s]
        #print l
        
        #l = set(l)
        #l = list(l)
        #l.sort()
        #for u in s: print [u]
        #text = re.sub('[#]', '', s)
        #se.sort()
        #set(se)
        #keyword = keywordExtract()
        #keyword = keyword.get(s)
        #print se[-5:]


        return s
        	
        	
    #print(text)




