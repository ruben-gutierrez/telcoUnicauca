#!/bin/sh

# export OS_USERNAME=TestbedIMS
export OS_USERNAME=Testbed_IMS
export OS_PROJECT_NAME=Testbed_IMS
export OS_PROJECT_DOMAIN_NAME=default
export OS_USER_DOMAIN_NAME=Default
export OS_PASSWORD=Testbed_IMS
export OS_AUTH_URL=http://10.55.2.20/identity/v3
  

TMPFILE=`mktemp`
chmod 600 ${TMPFILE}

JSONFILE=`mktemp`
chmod 600 ${JSONFILE}

cat >${JSONFILE} <<EOF
{
  "auth": {
    "identity": {
       "methods": ["password"],
          "password": {
             "user": {
                "domain": {"name": "${OS_USER_DOMAIN_NAME}"},
                   "name": "${OS_USERNAME}",
                   "password": "${OS_PASSWORD}"
             }
          }
       },
       "scope": {
          "project": {
             "domain": {"name": "${OS_PROJECT_DOMAIN_NAME}"},
                "name": "${OS_PROJECT_NAME}"
          }
       }
   }
}
EOF

PYTHONSCRIPT=`mktemp`
chmod 755 ${PYTHONSCRIPT}

cat > ${PYTHONSCRIPT} << EOF
#!/usr/bin/env python
import sys
import json
import re
list=json.load(sys.stdin)["token"]["catalog"]
for i in list:
   if i["type"] == "object-store" and re.search('swift',i["name"])!=None:
      for j in i["endpoints"]:
         if j["interface"]=="public":
            print "export OS_STORAGE_URL="+j["url"]
EOF


curl -si  \
  -H "Content-Type: application/json" \
  -o ${TMPFILE} \
  -d @${JSONFILE} \
${OS_AUTH_URL}/auth/tokens 2>/dev/null | grep 'X-Subject-Token: ' | awk '{print $1}'


# OS_TOKEN=`cat ${TMPFILE} | grep 'X-Subject-Token:' | awk '{print $2}'`
token=`cat ${TMPFILE} | grep 'X-Subject-Token:' | awk '{print $2}'`
#echo "export OS_AUTH_TOKEN="${token}
printf $token
#echo
#curl -g -i -X GET http://10.55.5.155/compute/v2.1/flavors/detail?is_public=None -H "Accept: application/json" -H "User-Agent: python-novaclient" -H "X-Auth-Token: $token" -H "X-OpenStack-Nova-API-Version: 2.1"

tail -1 ${TMPFILE} | ${PYTHONSCRIPT}
rm -f ${TMPFILE} ${PYTHONSCRIPT} ${JSONFILE}