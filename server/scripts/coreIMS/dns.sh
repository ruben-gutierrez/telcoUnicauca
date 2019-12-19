#!/bin/bash
echo "Instalación DNS comando: apt-get install bind9"
apt-get install bind9 --yes
dominio=$1
DNS_IP=$2
bono=$3
sprout=$4
ellis=$5
homer=$6
vellum=$7
dime=$8
ibcf=$9
echo "Crear Zona DNS"
cd /etc/bind/
touch telco2.dnszones
DNS_ZONES=/etc/bind/telco2.dnszones
echo "Configurando DNS ZONES"
echo '$TTL 5m ; Default TTL

; SOA, NS and A record for DNS server itself
@                 3600 IN SOA  testbed.unicauca.edu.co. root.testbed.unicauca.edu.co. ( 2014010800 ; Ser$
                                          3600       ; Refresh
                                          3600       ; Retry
                                          3600       ; Expire
                                          300 )      ; Minimum TTL
@                 3600 IN NS   testbed4.unicauca.edu.co.
;@                 3600 IN A     10.55.5.52; IPv4 address of BIND server


bono                    IN A  '$bono'
nodo-bono               IN A  '$bono'
@                       IN A  '$bono'

@                      IN NAPTR 1 1 "S" "SIP+D2T" "" _sip._tcp
_sip._tcp              IN SRV   0 0 5060 bono


sprout                 IN A  '$sprout'
sprout-1               IN A  '$sprout'
scscf.sprout           IN A  '$sprout'


sprout                 IN NAPTR 1 1 "S" "SIP+D2T" "" _sip._tcp.sprout
_sip._tcp.sprout       IN SRV   0 0 5054 sprout
scscf.sprout           IN NAPTR 1 1 "S" "SIP+D2T" "" _sip._tcp.scscf.sprout
_sip._tcp.scscf.sprout IN SRV   0 0 5054 sprout


icscf.sprout            IN A    '$sprout'
_sip._tcp.icscf.sprout IN SRV   0 0 5052 sprout


dime                   IN A   '$dime'
dime-1                 IN A   '$dime'

hs                     IN A   '$dime'
ralf                   IN A   '$dime'


homer                  IN A     '$homer'
homer-1                IN A     '$homer'
vellum                 IN A     '$vellum'
vellum-1               IN A     '$vellum'
ellis                  IN A     '$ellis'
ellis-1                IN A     '$ellis'
ibcf                   IN A     '$ibcf' ' > $DNS_ZONES
#cat $DNS_ZONES

echo "Configurar archivo name.conf.local"
DNS_ZONES1=/etc/bind/named.conf.local
echo "Configurando DNS ZONES"

echo 'zone "testbed1.unicauca.edu.co" IN {
        type master; file "/etc/bind/telco2.dnszones";
        };' >> $DNS_ZONES1

#cat $DNS_ZONES1 


echo "Archivos configurados ZONA TELCO 2"
cat $DNS_ZONES1
echo "Archivos configurados archivo name.conf.local"
cat $DNS_ZONES

echo "Reiniciar servicios DNS comando: /etc/init.d/bind9 restart"
/etc/init.d/bind9 restart


