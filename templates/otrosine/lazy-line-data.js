/* 
* Lazy Line Painter 1.0
* SVG Stroke animation.
*
* https://github.com/camoconnell/lazy-line-painter
*
* Copyright 2013 
* Cam O"Connell - http://www.camoconnell.com  http://www.behance.net/camoconnell 
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*  
*/ 

var svgData = { 

	"ll-horizontal-grid" : { "strokepath" : [{"path": "M 2 424.5 L 579 424.5","duration":400},{"path": "M 2 404.5 L 579 404.5","duration":400},{"path": "M 2 384.5 L 579 384.5","duration":300},{"path": "M 2 364.5 L 579 364.5","duration":300},{"path": "M 2 344.5 L 579 344.5","duration":300},{"path": "M 2 324.5 L 579 324.5","duration":300},{"path": "M 2 304.5 L 579 304.5","duration":200},{"path": "M 2 284.5 L 579 284.5","duration":200},{"path": "M 2 264.5 L 579 264.5","duration":200},{"path": "M 2 244.5 L 579 244.5","duration":200},{"path": "M 2 224.5 L 579 224.5","duration":200},{"path": "M 2 204.5 L 579 204.5","duration":100},{"path": "M 2 184.5 L 579 184.5","duration":100},{"path": "M 2 164.5 L 579 164.5","duration":100},{"path": "M 2 144.5 L 579 144.5","duration":100},{"path": "M 2 124.5 L 579 124.5","duration":100},{"path": "M 2 103.5 L 579 103.5","duration":100},{"path": "M 2 83.5 L 579 83.5","duration":100},{"path": "M 2 63.5 L 579 63.5","duration":50},{"path": "M 2 43.5 L 579 43.5","duration":50},{"path": "M 2 23.5 L 579 23.5","duration":50}] , "dimensions" : { "width" :  582, "height" : 448} },
	
	"ll-vertical-grid" : { "strokepath" : [{"path": "M 29.5 4 L 29.5 443","duration":400},{"path": "M 49.5 4 L 49.5 443","duration":400},{"path": "M 69.5 4 L 69.5 443","duration":300},{"path": "M 89.5 4 L 89.5 443","duration":300},{"path": "M 109.5 4 L 109.5 443","duration":300},{"path": "M 129.5 4 L 129.5 443","duration":300},{"path": "M 149.5 4 L 149.5 443","duration":300},{"path": "M 169.5 4 L 169.5 443","duration":300},{"path": "M 189.5 4 L 189.5 443","duration":200},{"path": "M 209.5 4 L 209.5 443","duration":200},{"path": "M 229.5 4 L 229.5 443","duration":200},{"path": "M 249.5 4 L 249.5 443","duration":200},{"path": "M 269.5 4 L 269.5 443","duration":200},{"path": "M 289.5 4 L 289.5 443","duration":200},{"path": "M 309.5 4 L 309.5 443","duration":100},{"path": "M 329.5 4 L 329.5 443","duration":100},{"path": "M 349.5 4 L 349.5 443","duration":100},{"path": "M 369.5 4 L 369.5 443","duration":100},{"path": "M 389.5 4 L 389.5 443","duration":100},{"path": "M 409.5 4 L 409.5 443","duration":100},{"path": "M 429.5 4 L 429.5 443","duration":100},{"path": "M 449.5 4 L 449.5 443","duration":100},{"path": "M 469.5 4 L 469.5 443","duration":50},{"path": "M 489.5 4 L 489.5 443","duration":50},{"path": "M 510.5 4 L 510.5 443","duration":50},{"path": "M 530.5 4 L 530.5 443","duration":50},{"path": "M 550.5 4 L 550.5 443","duration":50}] , "dimensions" : { "width" :  582, "height" : 448} },
	
	"ll-shape" : { "strokepath" : [{"path": "M 229 385 L 271 345","duration":200},{"path": "M 309 346 L 349 386","duration":200},{"path": "M 409 244 L 450 285","duration":200},{"path": "M 411 205 L 450 166","duration":200},{"path": "M 128 283 L 170 243","duration":200},{"path": "M 129 163 L 171.5 205.5","duration":200},{"path": "M 390 326 L 369.5 305.5","duration":200},{"path": "M 189 325 L 209 305","duration":200},{"path": "M 189 286 L 210.073 264.927","duration":200},{"path": "M 230 326 L 250.91 305.09","duration":200},{"path": "M 329.206 307.207 L 351 328","duration":200},{"path": "M 370.293 267.29 L 390.001 285.999","duration":200},{"path": "M 190 164 L 208 182","duration":200},{"path": "M 190 124 L 208.5 142.5","duration":200},{"path": "M 229 122 L 250 143","duration":200},{"path": "M 229.5 63 L 270.25 103.75","duration":200},{"path": "M 310 104 L 349.5 64.5","duration":200},{"path": "M 390 126 L 371 145","duration":200},{"path": "M 329.509 144.509 L 350.509 123.509","duration":200},{"path": "M 372.502 182.502 L 392.002 164.002","duration":200},{"path": "M 289.749,63.41 L 309,84 309,103 329,103   350,82 350,125 390,125 390,164 431,164 409,185.5 409,204 429,204 449.167,224.333 428.667,245 408,245 408,262 431.334,285   390,285 390,326 351,326 351,367 329,345 310,345 310,364 290.333,383.666 271,364.333 271,344 252,344 230,366 230,326 190,326   190,286 150,286 170,265.333 170,243 149,243 131.833,224.667 152.333,206 173,206 173,184 152.833,164 190,164 190,124 230,124   230,82 252.667,105 270,105 270,83 289.167,64.833 ","duration":4000},{"path": "M 229,43.83 L 330.167,145 371,145   372,183.333 470.834,285.167 ","duration":400},{"path": "M 347.67,405.24 L 249.666,306 209,306   209,265 107,165 89,183 131.667,225.667 92.333,264.834 108.666,282 128,282 128,306 169,306 169,325 190,325 190,347 209,347   209,386 228,386 228,406 248.333,426.333 290.666,384 330.666,424 349,404.666 349,386 368,386 368,344 389,344 389,324 408,324   408,305 450,305 450,285 470,285 488.166,266.834 447.333,226.001 488.333,185.167 469.999,167 450,167 450,145 408,145 408,126   390,126 390,104 368,104 368,64 348,64 348,43 330.833,25.833 291.666,65 250.333,23.667 230,44 230,62 208,62 208,105 190,105   190,124 166,124 166,144 129,144 129,163 108,163 ","duration":4000},{"path": "M 107.834,282.33 L 208,182.334 208,143   250,143 348.5,44.5 ","duration":400},{"path": "M 228.833,405. L 328,306 371,306 371,268   471.667,167.333 ","duration":400},{"path": "M 349.667,244.33 L 309.667,204.333 270,244   309,244 269.167,204 229.083,244.083 ","duration":1000}] , "dimensions" : { "width" :  582, "height" : 448} },

	"ll-face" :
	{ 
		"strokepath" :
		[ 
			{   "path": "M7.603,5.5 c0,0,10.298,24.07,33.517,24.07c23.221,0,33.519-24.07,33.519-24.07s9.142,24.07,33.513,24.07c24.372,0,33.515-24.07,33.515-24.07 s10.858,24.07,33.518,24.07S208.703,5.5,208.703,5.5s9.717,24.07,33.521,24.07c23.801,0,33.518-24.07,33.518-24.07 s13.828,24.07,33.524,24.07c19.698,0,33.524-24.07,33.524-24.07",
				"duration":1400 
				},
			{   "path": "M120,139.129 c0,0-8.708-34.233-42.483-34.236c-28.724-0.001-42.493,34.23-42.493,34.23",
				"duration":300
				},
			{   "path": "M313.5,137.138 c0,0-12.209-32.137-39.746-32.138C246.216,104.999,234,137.132,234,137.132",
				"duration":300
				},
			{   "path": "M80.246,193.604 c0,0,21.399,74.387,93.074,74.387c76.026,0,93.095-74.387,93.095-74.387",
				"duration":300
				}
		],  
		"dimensions" : { "width": 349, "height":277 }
	},
	
	 
	
	"ll-chair" :
	{ 
		"strokepath" :
		[ 
			{   "path": "M228.333,143c0,0-27.333-10-29.333-12",
				"duration":300 
				},
			{   "path": "M257.75,358.5c0,0-1.5,5.75-6.75,5.5s-6.5-6.75-6.5-6.75s2.25,1,5.25,1.25s8.75,0.25,8.25-4s-1.75-3.5-1.75-3.5   s-8.25,3.25-12.75-6.25c4.25,0.75,4.75,1.5,8.5,1.5s8.25,0.5,8.5-2.5s-0.25-5.5-3-6.25c-2.25,3-7.75,1.5-9.75-1   c0,0-3.75,1.75-3.75,6",
				"duration":300
				},
			{   "path": "M247.75,336.5c0,0-2-18-1.75-22.5s-1-6.25,0.75-8s1.75-1.75,1.75-1.75s2.5,2,6.5,2s6-2.75,6-2.75s4.75,3,2.5,5s-4.75,3.25-8.5,3.25   s-7.25-2.5-7.25-2.5",
				"duration":300
				},
			{   "path": "M257.5,337.5c0,0,1.25-7.25,2.25-13s3.25-11.25,3.75-16",
				"duration":300
				},
			{   "path": "M226.5,295.75c0,0,9.75-2,14-2",
				"duration":300
				},
			{   "path": "M123.5,374c0,0,1,6,6.5,6   s5.5-6,5.5-6",
				"duration":300
				},
			{   "path": "M126,366c0,0-5,6,0,6   s6,0.5,7.5,0.5s5.5-0.5,3-5.5",
				"duration":300
				},
			{   "path": "M122,357.5c0,0-1,9,7.5,9   S140,358,140,358s-5,2-10.5,2c0,0-12,2-6-7.5c5,4,12.5,2.5,14.5-0.5c2,3,2,3,2,3",
				"duration":300
				},
			{   "path": "M123.5,352.5l-2.5-32   c0,0,0-3.5,4-4",
				"duration":300
				},
			{   "path": "M126.5,324   c0,0,11,2.5,15.5-3.5c-2-2-3.5-4-3.5-4",
				"duration":300
				},
			{   "path": "M98.5,285.5c0,0,2-6.5,6-4   s6,5,6,5",
				"duration":300
				},
			{   "path": "M113.5,297.5   c0,0,1.5-4.5,4.5-3c1-3-3.5-8-6.5-6s-6.5,9.5-3,11.5s6,1.5,6,1.5l6.5,3.5",
				"duration":300
				},
			{   "path": "M125.5,294.75   c0,0-1,4.25-3.5,8.25c0,4,0,12,0,12s6,3.5,10,3.5s8.5-3.5,8.5-3.5l0.5-11.5l-11,1.5",
				"duration":300
				},
			{   "path": "M124,297.5   c0,0,4.5,4.5,13,1.5c3.5,1.5,4,4.5,4,4.5",
				"duration":300
				},
			{   "path": "M137,299c0,0,4-7,7-7",
				"duration":300
				},
			{   "path": "M144.5,289   c0,0,18.5,0,28-2.5",
				"duration":300
				},
			{   "path": "M143,303.5   c0,0,7-1.5,14.5-1.5",
				"duration":300
				},
			{   "path": "M141.5,308.5   c0,0,6.5-3,16-2s10-1,10-1",
				"duration":300
				},
			{   "path": "M243,296.5   c-4,0.5-19,3-19,3",
				"duration":300
				},
			{   "path": "M262.375,302.75l0.688-10.375c0,0-6.031,1.438-8.031,1.438s-7.516-2.531-7.516-2.531s-2.508-4.516,4.242-8.266   c2.5,2.5,4.246,2.992,7.496,0.492s6.373-8.004,6.373-8.004L252,277.25V252c0,0-0.5-4.5,1.25-4.5s14.25-1.25,14.25-1.25   s-0.25-5.5-4.75-7.25",
				"duration":300
				},
			{   "path": "M260.75,283c0,0,6.5,5.5,3,9",
				"duration":300
				},
			{   "path": "M247.5,293.75l-17.5-12.5   c0,0,0.5-2.5,5.5-3.25s14-1,14-1",
				"duration":300
				},
			{   "path": "M267.5,246.25   c0,0-0.25,27-1.25,28.5",
				"duration":300
				},
			{   "path": "M248.25,277.75   c0,0,1.5,5,4.75,6",
				"duration":300
				},
			{   "path": "M248.25,223.75c0,0,3.25,9.5,4,12.5s7,5,9.25,1s4.75-9.75,5.25-13.5c-1,0.75-5.5,0.75-10.25,0.75c0,0-8.5-0.5-7.75-6   c4.5,2,5,3.25,12.25,2.5s5-1,5-1s3.25-4.25-1.25-3.75S254.25,217,251,216",
				"duration":300
				},
			{   "path": "M198,133.75c0,0,20.75,11,29,11.75",
				"duration":300
				},
			{   "path": "M201.5,143.25c0,0,4.25,1,5-1.75s0.75-2.75,0.75-2.75",
				"duration":300
				},
			{   "path": "M217.5,144c0,0-1,6,7,6.5",
				"duration":300
				},
			{   "path": "M220,150c0,0-0.753,9.918-0.001,15.334",
				"duration":300
				},
			{   "path": "M264.5,162.5c0,0,1.25,18.25,1.25,28s-1,13-1,13s-8.25,3.25-11.5,0.75S253.5,192,253.5,192",
				"duration":300
				},
			{   "path": "M249.75,203.25c0,0-3.5,2-2.25,5.5s5.75,6,5.75,6s-0.25-4.25,1.5-4.25s2,3.25,4,3.25s3.5-3,3.5-3s-1,3.75,1.25,3.75s5.5-3,5-7.25   s-3.25-5-3.25-5",
				"duration":300
				},
			{   "path": "M246.75,254.75c0,0,1-6-1.75-8s-5.5-4.25-5.5-4.25l-0.25-6.75c0,0,6.25,8.5,10.75,9.5c0-3,1.25-6.25,3-7.75",
				"duration":300
				},
			{   "path": "M106,294l-7.5-5.5c0,0-7.5,1-5.5-6.5c0,0,0.5-5.5,6-6s5.5,5.5,5.5,5.5",
				"duration":300
				}
		],  
		"dimensions" : { "width": 290, "height":420 }
	},
	

	"ll-guy" :
	{ 
		"strokepath" :
		[
			{   "path": "M56.25,51  c2.75-0.75,14.25,3,20,0.75",
				"duration":100 
				},
			{ 	"path": "M89.75,28.5  c0,0,5,2.75,7.5,1.5c7.5-2,8.25-15.75,12.25-15.75",
				"duration":200
				},
			{ 	"path": "M86.5,21.75c0,0,4.25,4,11.5,0c2.5-1-3.25,10-13.5,3.5c-3.25-2,0-6.75,1-10.5s1-8.25,1-8.25s3.25,8.75,16.5,6.75",
				"duration":300
				},
			{ 	"path": "M99.75,10.5  c0,0-12.5-2.25-15.5-5.5s-15-1.25-19,1s-14.75,13.25-18,13.75",
				"duration":300
				},
			{ 	"path": "M83.75,8  c0,0-2,1.25-2.25,3.5s2.75,28-9,29c-16.5,0.75-14-24-26.25-21.25",
				"duration":300
				},
			{ 	"path": "M60.5,35.75  c-7.25-0.25-10.75-15-16.75-15.75",
				"duration":300
				},
			{ 	"path": "M56.25,34  c0,0-6.25-0.5-9.75-5.75S41,21.5,38.75,21.5",
				"duration":300
				},
			{ 	"path": "M52,33.5  c0,0-5.25,9.75-12,1.5s-3-11-3-11c3-0.25,6,8.75,9.25,10.5s7.25-1.25,7.25-1.25",
				"duration":300
				},
			{ 	"path": "M55.75,61c0,0,2-1.75,6-0.75s8.25,4.25,11.5,3.5c-1.5,0.75-9.5,2-15,0C64.5,66,71,65,71,65s-1.25,3.75-4.75,3.5s7.5-1,7.5-4.5  c-1,2.75-1.5,8,0,9c-1,1-4-0.5-4,3.5c0,0,3.75,6,7.5,5.25S81,78.5,83.5,78s3.75-3.5,2.5-4.75c1.25,0.75,2.5,4.25,5,5",
				"duration":300
				},
			{ 	"path": "M88.25,68.75c0,0-6.5-1.75-7.75-5.5c3.25,0.75,3.5,1,5.75-0.25S88,61.75,93,61.5c-8,1.75-8.75-1.75-15.75,0",
				"duration":300
				},
			{ 	"path": "M74.333,27.667  c-2.667,1.667-6.667,3.333-12,3.333",
				"duration":300
				},
			{ 	"path": "M100.333,30  c2,1.333,7.333,3,10,1.333",
				"duration":300
				},
			{ 	"path": "M107.333,15.667  c0,0,2,2.333,6,4.667s7.667,4.333,7.667,8s-5,9-5.333,10",
				"duration":300
				},
			{ 	"path": "M66.333,83.667c0,0,2,6,7,6  s6.333-5,6.333-5s1.334,6,6.667,6S97.333,85,95.667,82S91,80,91,82",
				"duration":300
				},
			{ 	"path": "M80.667,82  c0,0,2.333,0,5.333,0.667s4.333,4,8,2.667",
				"duration":300
				},
			{ 	"path": "M76.667,89.333  c0,0,0.333,4.333,8,5.333s18-4.333,22-11.333S115,73,116.333,61.667s1.333-23,1.333-23",
				"duration":300
				},
			{ 	"path": "M143.333,52.667  c0,0-6-8-14-11S117,47.333,117,47.333s1.999,25.334-1.001,37.001s-10.667,38-10.667,38",
				"duration":300
				},
			{ 	"path": "M134.666,41.667  c0,0,29.667-5.333,34-3.333s9.333,8.333,12,8.333s23,11.334,30,15.334s21,17,30.333,20s16.333,11,21.333,14.667  c0,0,12.666,5.333,12.999,12.667s-4,21-5.333,28.667s-12.667,51.667-20.667,58.667c-2,2-6.333,3-6.333,3",
				"duration":300
				},
			{ 	"path": "M243.332,193.334  c0,0-0.333,8-3.667,11.333c-4-3-29-15-29-15s-9.333,6.333-13.666,11s-4.333,14-8.333,17c0,2.667,3.333,3,8.667-2.333",
				"duration":300
				},
			{ 	"path": "M164.999,52.667  c0,0,3.333,14.333,7.667,22s3.667,10.667,5.333,12s11,14.334,14,16.667s17.666,11.667,21.333,13c1.667,3,6.333,10.333,10.333,10.333  c2.333-2.333,1.667-7,5.333-9.333c0,0,21.333-16,24.667-15.333",
				"duration":300
				},
			{ 	"path": "M236.665,107.667  c0,0,11.333-9.333,15.333-9.333s7.333,1.333,7.333,1.333",
				"duration":300
				},
			{ 	"path": "M247.665,109.667  c0,0,5,0,8-2s7.667-1,7.667-1",
				"duration":300
				},
			{ 	"path": "M225.665,124.334  c0,0,6.333-2,11.667-5.333s10.667-5.667,10.667-5.667",
				"duration":300
				},
			{ 	"path": "M230.665,123.667  c0,0-1.667,12-1.667,17s-6.333,17.334-9,24.667s-5.333,15.333-7.333,18.667s-2,3.333-2,3.333s6.667-2.667,12.667-1.333  s23,9.333,23,9.333",
				"duration":300
				},
			{ 	"path": "M125.999,86.001  c0,0,8.333,1.667,9.667,0s-3.667-13-4-16.333s-4.667-18-8.667-20.667",
				"duration":300
				},
			{ 	"path": "M132.666,56.667  c0,0,4.667,24.333,5.667,26s4.333,8,4.333,8",
				"duration":300
				},
			{ 	"path": "M54.333,69.667  c0,0,0.333,9.333,3,12.667s6.333,8.333,6.333,8.333",
				"duration":300
				},
			{ 	"path": "M53.667,79.667  c0,0,2,7.667,5.333,10s4.667,4.333,8,9s14,9.333,15.333,15",
				"duration":300
				},
			{ 	"path": "M96.667,93.333  c0,0,4.333,10.333,4.333,16s-0.667,12-0.667,12",
				"duration":300
				},
			{ 	"path": "M80.667,129.667  c0,0,3.333-5,3.333-9.333s-4.333-7-4.333-7s-2.866,4.439-5,7",
				"duration":300
				},
			{ 	"path": "M82.667,116  c0,0,10.666,0.334,13.333,2.667s12.333,5,11,7.333s-3.666,9.667-5.333,11.667s-6.667,5.666-10,3.333s-19-17.333-18-19  s-13,15-15.333,20.333S54,157,52.667,160.333",
				"duration":300
				},
			{ 	"path": "M44,157  c0,0,4.333-6.333,8-8.667s9.667-9.333,10-18s-9-18-10-24.333",
				"duration":300
				},
			{ 	"path": "M52.667,92.667  c0,0,0.667,10,3,13.667s5.667,15.667,5.667,19",
				"duration":300
				},
			{ 	"path": "M47,87.333  c0,0,2-9.333,3.333-12S53,71.667,53,66.667c-1.333,4-7.333,10-13,12.667s-7,10-7.667,11.333s2.333,7.333,3,8.667  c-1.667-0.333-4,0.333-4,6.333s1.333,30.666,1.333,35.333s-3,35-2.667,39.333s11.334,14,14.667,17s7,5.333,13.667,4.333  S76,195.999,81.667,183.333s8.666-11.667,10.333-24",
				"duration":300
				},
			{ 	"path": "M256.666,171.667  c0,0-7.333-8.333-16.333-9.333s-16-0.333-16-0.333",
				"duration":300
				},
			{ 	"path": "M197.666,204.667c0,0-1.667,10.333,2.333,13s6-0.333,6-0.333s0.667,4,5,4s6.333-1.667,6.333-1.667s-2,2.667,2,3s10,2,13.333-4  s2-12,3.333-15",
				"duration":300
				},
			{ 	"path": "M118.333,77.667  c0,0,5.333,7,5.333,13c4,0.667,10.334,2.667,16.667,1.333",
				"duration":300
				},
			{ 	"path": "M128,88.333  c0,0,9,3,17.333,1.667c4.667-1.333,4,3.333,1.333,6c-12,14.333-38,36.333-38.667,41.333c0,0-0.667,1.333,0.333,4.333  s12.667,20,12.667,27.667s0.667,8.666,3.333,13.333s3.333,15.667,3.667,19.667s10.667,17.666,11.667,22.333s2.667,7,2.667,7  s0.667,3.667,2.667,3s6.667-2.334,8,2.333s-1,13.667,4.667,15.333s12.667-0.333,17-5.333s8.667-22,14-26",
				"duration":800
				},
			{ 	"path": "M215,177.333  c0,0,0.667-10-1.667-14.333s-5.667-11.667-9.667-12c-1.667-5-2.667-10.333-6-13.667c0.333-9.667-2.667-25-4.667-33",
				"duration":300
				},
			{ 	"path": "M176.666,53.333  c0,0,1,12,1.667,16.333s-1.333,14,1.667,19.333",
				"duration":300
				},
			{ 	"path": "M62.334,200.665  c0,0,13.667-5.333,24,2.667s18.333,23.666,24,27.333s15.333,11.333,30,5" ,
				"duration":300
				},
			{ 	"path": "M117,212.665  c0,0-9.667-15.333-20-21.333s-15.667-6-15.667-6s15,2,23.333,10.333s16,14,21,12.333",
				"duration":300
				},
			{ 	"path": "M151.334,223.999c0,0,9-9.667,22.333-14.667S203,186.665,205,181.665c-8.667,12.333-16.333,20.667-24.333,27.333  s-15.667,19.667-17,26",
				"duration":300
				},
			{ 	"path": "M177,198.332c0,0-20.333,8.667-29.333,8.667s-17.667-4-17.667-4",
				"duration":300
				},
			{ 	"path": "M129.667,139.333c0,0,11.333,1.667,19.333-1.667s20.333-10.333,20.333-10.333",
				"duration":300
				},
			{ 	"path": "M131,152.999c0,0,10-7.333,20.667-6.333S165,143.999,165,143.999",
				"duration":300
				},
			{ 	"path": "M130,170.332c0,0,14.667-1.667,24-3.667s16.667-1.667,16.667-1.667",
				"duration":300
				},
			{ 	"path": "M155.667,190.332c0,0-1-5.333,2.333-5.667s21-9,22.667-15.667",
				"duration":300
				},
			{ 	"path": "M98.833,158c0,0,4.833,3,10.167,3s4,0,4,0",
				"duration":300
				},
			{ 	"path": "M99.334,174.332c0,0,5.667,6,10.667,8.333s7.667,0.333,7.667,0.333",
				"duration":300
				},
			{ 	"path": "M47,202.5c0,0-9.5,9.5-10.5,16.5s0.5,9.5,0.5,13s-0.5,12-1,17.5s5.5,38.5,6,42s5,26.5,5,35.5s2,38,4.5,38s6.5-3,12-2.5s22,2,26.5-2  s3.5-12,5-22.5s-3.5-13.5-3.5-13.5s3-7.5-0.5-12.5s-10-14-10-14",
				"duration":300
				},
			{ 	"path": "M74.5,293c0,0-8-13-10-19.5s-8-12-8-12",
				"duration":300
				},
			{ 	"path": "M82.25,288.75c0,0,2.375,2.875,3.875,8.875S88,309,88,309v-32c0,0-2.5-17.5-2.5-22s0.5-5-3.5-9.5c0,0-12.5-11-12.5-16.5",
				"duration":300
				},
			{ 	"path": "M77,225.5c0,0,0,3,3,7.5s5.5,15,5.5,15s2.5-4.5,2.5-11.5s3,10.5,0,13c6.5-1.5,12-6,18.5-6.5s20.5-3,28.5-2.5s13,7.5,18,8",
				"duration":300
				},
			{ 	"path": "M171,253.5c0,0-1,6.5,6,1.5s17-18,17-18l-17,22.5c0,0,7.5,4,16,0s-16,3.5-16,3.5s-1.5,8.5-1.5,11.5s-1,14-5.5,19c1,2.5,8,7.5,8,7.5  s-8.5-3.5-8.5-1.5s4,5.5,4,5.5s-5-2.5-6.5,2.5s-6.5,26-10,37s-5.5,11.5-4,13.5s31.5,18.5,36,16s0-5,0-5s18-40,21.5-52.5  c-3,2-7-2.5-7-2.5s5,4,11-4.5s15.5-28.5,19-44.5s7.5-11,6-22.5s-5-26.5-5-26.5",
				"duration":800
				},
			{ 	"path": "M56.5,365c0,0-7,8-9.5,12.5s-6,10.5-8.5,13s-8.5,9-8.5,14s10,12,20,8s20.5-7.5,22.5-21C79,389,90.5,386,92,379s-2-18.5-2-18.5",
				"duration":300
				},
			{ 	"path": "M51.5,378c0,0,6.5,7,13.5,3.5s14-15,14-15",
				"duration":300
				},
			{ 	"path": "M58.5,375c0,0,4-11,10-11",
				"duration":300
				},
			{ 	"path": "M44.5,385c0,0,7.5,1,9,3.5",
				"duration":300
				},
			{ 	"path": "M153,358c0,0-4,9-1.5,16s9,10,14,19s5.5,18.5,22,16.5s15.5-5.5,15-11.5s-16-23.5-16-23.5",
				"duration":300
				},
			{ 	"path": "M163.5,368.5c0,0,7,16.5,16.5,15",
				"duration":300
				},
			{ 	"path": "M184.5,395c0,0,7-5,13-3.5",
				"duration":300
				},
			{ 	"path": "M88.5,150  c-1.657,0-3-0.343-3-2s1.343-3,3-3s3,1.343,3,3s-1.343,3-3,3",
				"duration":300
				},
			{ 	"path": "M83.5,160  c-1.657,0-3-1.343-3-3s1.343-2,3-2s3,0.343,3,2S85.157,160,83.5,160",
				"duration":300
				},
			{ 	"path": "M120.5,159  c-1.657,0-3-1.343-3-3s1.343-2,3-2s3,0.343,3,2S122.157,159,120.5,159",
				"duration":300
				},
			{ 	"path": "M147.5,152  c-1.657,0-3-1.343-3-3s1.343-2,3-2s3,0.343,3,2S149.157,152,147.5,152",
				"duration":300
				},
			{ 	"path": "M150.432,171.095  c0.931-1.371,2.796-1.727,4.167-0.796c1.371,0.931,0.9,2.235-0.031,3.605c-0.931,1.371-1.969,2.289-3.34,1.358  S149.501,172.466,150.432,171.095",
				"duration":300
				},
			{ 	"path": "M152.432,198.095  c0.931-1.371,2.796-1.727,4.167-0.796c1.371,0.931,1.9,2.235,0.969,3.605c-0.931,1.371-2.969,2.289-4.34,1.358  S151.501,199.466,152.432,198.095",
				"duration":300
				},
			{ 	"path": "M125.432,177.095  c0.931-1.371,2.796-1.727,4.167-0.796c1.371,0.931,0.9,2.235-0.031,3.605c-0.931,1.371-1.969,2.289-3.34,1.358  S124.501,178.466,125.432,177.095",
				"duration":300
				},
			{ 	"path": "M133.432,124.095  c0.931-1.371,2.796-1.727,4.167-0.796c1.371,0.931,1.9,3.235,0.969,4.605c-0.931,1.371-2.969,1.289-4.34,0.358  S132.501,125.466,133.432,124.095",
				"duration":300
				},
			{ 	"path": "M129.432,199.095  c0.931-1.371,2.796-1.727,4.167-0.796c1.371,0.931,1.9,2.235,0.969,3.605c-0.931,1.371-2.969,2.289-4.34,1.358  S128.501,200.466,129.432,199.095",
				"duration":300
				},
			{ 	"path": "M113.302,138.232  c-1.148,1.194-3.047,1.232-4.242,0.083c-1.194-1.148-0.511-2.354,0.637-3.548c1.148-1.194,2.327-1.925,3.521-0.777  C114.413,135.139,114.45,137.039,113.302,138.232",
				"duration":300
				},
			{ 	"path": "M60.333,26.5  c1.833,0,6.5-0.5,7.667-2.667",
				"duration":300
				},
			{ 	"path": "M65.5,21.667  c0,0-4.167,1.167-8.833-0.667c-0.5-1.667,4.333-1,7.833-3.667c0,0,2.833-0.667,3.5-2",
				"duration":300
				},
			{ 	"path": "M72,12.5  c0,0,3.5-0.833,4.833-1.833",
				"duration":300
				},
			{ 	"path": "M64,350.667  C75,349.334,79.667,359,84,359",
				"duration":300
				},
			{ 	"path": "M156.667,355.334c0,0,5.333,1,9.333-2s10.333,0,10.333,0",
				"duration":300
				} 
		],  
		"dimensions" : { "width": 290, "height":420 }
	}  
};
				