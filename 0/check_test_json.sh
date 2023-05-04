for f in test/*.json; do echo $f; jq . $f > /dev/null; done
