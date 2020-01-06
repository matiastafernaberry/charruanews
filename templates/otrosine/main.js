/* 
* Lazy Line Painter 1.0
* SVG Stroke animation.
*
* https://github.com/camoconnell/lazy-line-painter
*
* Copyright 2013 
* Cam O'Connell - http://www.camoconnell.com  http://www.behance.net/camoconnell 
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*  
*/ 
 
(function( $ ){   
	 
	$(document).ready(function(){
		 
		showcase.setup();
		 
		fitTitles();
		 
		$('.tooltip').tooltip({ 
			hide : { duration : 500 },
			position: { 
			my: "center bottom-20",
			at: "center top",
			using: function( position, feedback ) {
				$( this ).css( position );
				$( "<div>" )
				.addClass( "arrow" )
				.addClass( feedback.vertical )
				.addClass( feedback.horizontal )
				.appendTo( this );
				}
			}
		}); 
		
	});
	
	$(window).load(function(){
		
		showcase.init(); 
		
		$.Color.hook( "fill stroke" );	
		
		$('.btn').on('mouseover',
			function () {
				$(this).animate({'background-color':'#d78f8b'},200);
			}).on('mouseout',
			function () {
				$(this).animate({'background-color':'#845a5a'},500);
		});
		 
		converter.init();
	
		loadSocialBtns($('.share-small'));
	});
	
	
	var loadSocialBtns = function(context){
		var $target = $(context).parent().parent().find('#social-media-icons'); 
		Socialite.load($target);  // async from socialite.js
		
		$(context).parent().animate({'margin-top':-25},300);
		setTimeout(function () { 
			$(context).parent().animate({'margin-top': 0 }, 400);
		}.bind(context), 6000);	
	};
			
	
	var fitTitles = function(){
		
		$(".intro h1").fitText(0.58);
		$(".how-to h1").fitText(0.454);
		$(".download h2").fitText(0.88);
		$(".converter h1").fitText(0.9);
		$(".contact h1").fitText(0.5);
	};
	 
	
	/* intro area */
	var showcase = (function(){
		
		var lazylineHandler, 
			demos,
			$showcase; 
		
		var setup = function(){
			
			$showcase = $('.showcase');
			lazylineHandler = [];
			demos = [ 
				function(){
					
					// append element with unique id
					$showcase.append('<div id="ll-guy" />');
					
					// id must must the "ll-guy" dataset found in the svgData obj
					$("#ll-guy").lazylinepainter({ 
						'svgData' : svgData, 
						'strokeWidth':2, 
						'strokeColor':'#ffffff'
					}).lazylinepainter('paint');
					
					$showcase.append('<div id="ll-chair" />');
					$("#ll-chair").lazylinepainter({
						'svgData' : svgData, 
						'strokeWidth':2, 
						'strokeColor':'#c1c1c1', 
						'delay':3000 
					}).lazylinepainter('paint');
					 
					lazylineHandler.push($("#ll-guy"),$("#ll-chair"));
					
				}, 
				function(){
				
					$showcase.append('<div id="ll-face" />');
					$("#ll-face").lazylinepainter({ 
						'svgData' : svgData,
						'strokeWidth':7, 
						'strokeColor':'#de8f8f',
						'onComplete' : function(){
								$(this).animate({'marginTop':20},500);
							}	
					}).lazylinepainter('paint');
					
					lazylineHandler.push($("#ll-face"));
				}, 
				function(){
				
					$showcase.append('<div id="ll-vertical-grid" />');
					$('#ll-vertical-grid').lazylinepainter({
							'svgData' : svgData,
							'strokeWidth':1,  
							'strokeColor':'#dbd9d9'	
						}
					).lazylinepainter('paint');
					
					$showcase.append('<div id="ll-horizontal-grid" />');
					$('#ll-horizontal-grid').lazylinepainter({
							'svgData' : svgData,
							'strokeWidth':1,  
							'strokeColor':'#dbd9d9'	
						}
					).lazylinepainter('paint');
					
					$showcase.append('<div id="ll-shape" />');
					$('#ll-shape').lazylinepainter({
							'svgData' : svgData,
							'strokeWidth':2,  
							'strokeColor':'#de8f8f',
							'delay':5000	
						}
					).lazylinepainter('paint');
					
					lazylineHandler.push($('#ll-vertical-grid'),$('#ll-horizontal-grid'),$('#ll-shape'));
				}
			];	
		},
		
		init = function(){
			var index = 0;
			demos[index](); 
			
			$('section.intro .reload').on('click', function(){
				$.each(lazylineHandler, function(index,value){
					value.lazylinepainter('destroy');
				});	
				
				lazylineHandler = []; 
				
				if(index == (demos.length-1)){
					index = 0;
				}else{
					index++;
				}  
				
				demos[index]();
			}); 
		};
		
		
		return {
			setup : setup,
			init : init
		};
		
	})();
	
	
	
	
	/* SVG to Lazy Line converter */ 
	
	var converter = (function(){
		
		 
		var init = function(){
			 
			var errorHandler = function(event, id, fileName, reason) {
				qq.log("id: " + id + ", fileName: " + fileName + ", reason: " + reason);
			};   
			 
			$('#restricted-fine-uploader').on('mouseover',
				function () {
					$('.drop').animate({'top':90},200);
				}).on('mouseout',
				function () {
					$('.drop').animate({'top':80},500);
			});
			
			$('#restricted-fine-uploader').fineUploader({
				request: {
					endpoint: 'process.php'
				},
				multiple: false,
				validation: {
					allowedExtensions: ['svg'],
					sizeLimit: 40960 // 40 kB = 40 * 1024 bytes
				},
				text: {
					uploadButton: 'Click or Drop your SVG file here to be converted <br/> <span> max dimensions 1000 x 1000, 40kb</span> '
				},
				showMessage: function(message) { 
					$('#restricted-fine-uploader').append('<div class="alert alert-error">' + message + '</div>');
				}
			}).on('complete', function(event, id, fileName, responseJSON) {
				if (responseJSON.success) {
					
					fileName = fileName.replace('.svg','');
					fileName = fileName.replace(/ /g,'');
					fileName = fileName.replace('.','');
					
					var processedSvgData = process(responseJSON.svgData, fileName); 
					
					$.scrollTo( $('section.converter h1'), 1000, { offset: {top:-20},onAfter : function(){
						paintUsersLazyline(processedSvgData, fileName);
					}}); 
					 
				}
			}).on('mouseover',function(){
				$('.qq-upload-button').animate({'background-color':'#e95739', 'border-radius':30},200); 
			}).on('mouseout',function(){
				$('.qq-upload-button').animate({'background-color':'#de6565', 'border-radius':2 },200); 
			});
			
		};
	
	
		var paintUsersLazyline = function(processedSvgData, fileName){
			 
			processedSvgData =  $.parseJSON(processedSvgData);
			
			var titleblock = "/* \n * Lazy Line Painter - Path Object \n * Generated using 'SVG to Lazy Line Converter'\n * \n * http://lazylinepainter.info \n * Copyright 2013, Cam O'Connell  \n *  \n */ \n \n"; 
		
			
			$('#svg-output').text( titleblock+'var pathObj = ' +  JSON.stringify(processedSvgData, null, 4) + '; \n \n \n' );
			$('.edit-panel-wrap').fadeIn(1000);  
			
			
			
			$('#restricted-fine-uploader').fadeOut(1000, function(){

				$('.restricted-fine-uploader-wrap .frame').css('position','relative').animate({'background-color':'#ffffff'});
			});
			$('.drop').fadeOut(1000,function(){
			
			
				$('.frame').html('<div id="'+fileName+'" />');
				
				var $output = $('#'+fileName);
				
				$output.lazylinepainter({
						'svgData' : processedSvgData,
						'strokeWidth': 2,  
						'strokeColor': '#e09b99',
						'onComplete' : function(){
							$('.edit-panel').animate({'height' : 150 });
							toolbox( $(this) );
						} 
					}
				);
				
				
				
				var data = $output.data('lazyLinePainter'),
					outputWidth = data.width,  
					outputHeight = data.height;   
				 
				$('.converter .frame').animate({'border-radius':30, 'height':outputHeight+80},1000); 
				
				if(outputHeight > 400){
					$(' .restricted-fine-uploader-wrap').animate({'height':outputHeight+80},1000); 
				}
				
				outputWidth = (outputWidth > 1100) ? 1100 : outputWidth;
				
				if(outputWidth > 599){ 
					$('.converter .center-col').animate({'width':outputWidth+80},1000,function(){
						$output.lazylinepainter('paint');
					});
				} else { 
					$output.lazylinepainter('paint');
				}
			}); 
		};
	
		
		$('section.converter .reload').on('click', function(){
			$('.frame > .lazy-line').lazylinepainter('erase').lazylinepainter('paint');
		}); 
	 
	 
		var process = function(content, fname){
			
			var paths = [],
				svgData,
				contentSplit = content.split('path('),
				dimensions = contentSplit[0],
				canvasWidth,
				canvasHeight;
			
			contentSplit.shift();  
			
			dimensions = dimensions.split(',');
			canvasWidth = dimensions[1]; 
			canvasHeight = dimensions[2];  
			
			$.each(contentSplit,function(i,v){
				
				var path = v.split(')');
				path = path[0];
				paths.push(path);
				
			}); 
			
			var prefix = '{ "'+fname+'" : { "strokepath" : [ ',
				pathSyntax = '',
				suffix = '] , "dimensions" : { "width" : '+canvasWidth+', "height" :'+canvasHeight+'} } }';
		
			$.each(paths,function(i,v){
				
				var path = v;
				path = path.replace(/'/g, '\"');
				
				var duration = 800;
				
				if(path.length < 350){
					duration = 600;
				} else if(path.length >= 350 && path.length < 450) {
					duration = 800;
				} else if(path.length >= 450 && path.length < 550) {
					duration = 1000;
				} else if(path.length >= 550 && path.length < 650) {
					duration = 1300;
				} else if(path.length >= 650 && path.length < 800) {
					duration = 1400;
				} else if(path.length >= 800) {
					duration = 1800;
				}
				
				pathSyntax += '{"path": ' + path + ',"duration":' + duration + '}';
				
				if(i < (paths.length-1)) pathSyntax += ",";
			}); 
			
			svgData = prefix + pathSyntax + suffix;
			
			return svgData;
		};
		
		
		
		var toolbox = function( $this ){
 

			zeroClipboard($this); 
			
			var data = $this.data('lazyLinePainter');
			
			// adjust stroke width		 
			$("#strokeWidth").slider({
				
				orientation:"horizontal", 
				range : "min", 
				max   : 15, 
				slide : updateStroke,
				value : data.strokeWidth
					
			}); 
			
				
			function updateStroke() {
				
				data.strokeWidth = $("#strokeWidth").slider("value");
				
				$this.find('path').each(function(){
				
					$(this).attr('stroke-width',data.strokeWidth);
				
				}); 
			}
			 
			
			// adjust color	
			$("#red,#green,#blue").slider({
			
				orientation:"horizontal",
				range:"min",
				max:255,
				slide:sliderUpdate
			
			}); 
			
			function sliderUpdate() {
			
				var red   = $("#red").slider("value"),
					green = $("#green").slider("value"),
					blue  = $("#blue").slider("value");
				
				var hex = hexFromRGB(red,green,blue);
				
				data.strokeColor = "#"+hex;
				
				$this.find('path').css({"stroke": data.strokeColor });
			
			}	
			
			function hexFromRGB(r,g,b){
			
				var hex = [r.toString(16),g.toString(16),b.toString(16)];
				
				$.each(hex,function(nr,val){
				
					if(val.length===1){
				
						hex[nr]="0"+val;
				
					} 
				});
				
				return hex.join("").toUpperCase();
				
				}
			
			function setSlider(color){
			
				var red   = parseInt(color.substring(1,3),16),
					green = parseInt(color.substring(3,5),16),
					blue  = parseInt(color.substring(5,7),16);	
				
				$("#red").slider("value",red);
				$("#green").slider("value",green);
				$("#blue").slider("value",blue);			
			}
			
			// set initial color
			setSlider(data.strokeColor); 
		};
		
		 
		
		var zeroClipboard = function( $this ){ 
			// $('#copy-to-clip-wrap').zclip({
	//          path:'http://zeroclipboard.googlecode.com/svn-history/r10/trunk/ZeroClipboard.swf',
	//          copy:function(){return buildExample()} 



			var $copy = $('#copy-to-clip-wrap'),
				$btn =	$('#copy-to-clip'),
				clip = new ZeroClipboard( $copy );

			clip.on( 'mouseover',function(){
				$btn.animate({'background-color':'#845a5a'},200);
			});

			clip.on( 'mouseout',function(){
				$btn.animate({'background-color':'#DE6565'},500); 
			});

			// clip.on( 'mousedown' , buildExample );

			clip.on( 'complete', function(client, args) {
			  alert("Lazyline code copied to clipboard! ");
			} );


			$('#svg-output').text( buildExample( $this ) );

		};

			 
		var buildExample = function( $this ){
			 
			var container = $this.attr('id'),
				outputVal = $('#svg-output').val(),
				settings = {
					'svgData' : "pathObj",
					'strokeWidth': 2,        
					'strokeColor': '#e09b99' 
				};
			 
			
			var lazyLineFunc = "/* \n Setup and Paint your lazyline! \n */ \n \n $(document).ready(function(){ \n $('#" + container + "').lazylinepainter( \n "+JSON.stringify(settings, null, 4)+").lazylinepainter('paint'); \n });";
			 
			lazyLineFunc = lazyLineFunc.replace('"pathObj"',"pathObj");

			console.log(outputVal + lazyLineFunc);
			 
			return  outputVal + lazyLineFunc;  
			 
		};
		 
		
			
			 
		return { init : init };
	
	})();
	 
})( jQuery );



