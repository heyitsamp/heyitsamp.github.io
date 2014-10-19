#!/bin/sh

# gen.sh takes content/example.html, wraps it in index.html, splitting that
# fine file after <!-- content below -->, and stores the result in a file
# called example (no extension).
#
# This means that creating content/example.html and running ./gen.sh will
# make http://heyitsamp.com/example become a thing.
#
# BUG: This should be a grunt job, but sk did this in 15m and the grunt job
# would have taken him longer.

for f in content/*.html; do
    case $f in
	index.html)
	    # bad kind of crazy
	    continue
	;;
    esac
    bare=`basename $f .html`
    echo creating "$bare"
    sed '
	/<!-- content below -->/{
	    r '"$f"'
	}
    ' index.html >"$bare"
done
