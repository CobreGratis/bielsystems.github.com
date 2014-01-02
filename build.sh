#!/bin/sh
compass compile
cd javascripts
rm ./javascripts.min.js
cat jquery.maskedinput.js jquery.validate.js jquery.scrollTo.js jquery.localScroll.js jquery.prettyPhoto.js scripts.js > javascripts.js
java -jar ../tools/yuicompressor-2.4.8.jar ./javascripts.js -o ./javascripts.min.js -v
rm ./javascripts.js
cd ../
