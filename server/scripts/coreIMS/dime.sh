# #!/bin/bash

#EDITAR ARCHIVOS_RESOLV.CONF 

#VARIABLES IP
dominio=$1
DNS_IP=$2
bono=$3
sprout=$4
ellis=$5
homer=$6
vellum=$7
dime=$8
ibcf=$9
echo "Configurar DNS"
cd /etc/
echo -e "nameserver $DNS_IP \nnameserver 8.8.8.8 \nnameserver 8.8.4.4" > resolv.conf
cd ..
cd /etc/resolvconf/resolv.conf.d/
echo -e "nameserver $DNS_IP \nnameserver 8.8.8.8 \nnameserver 8.8.4.4" > head
DNS_clearwater=/etc/resolv.conf
DNS_clearwater1=/etc/resolvconf/resolv.conf.d/head

#echo "Configurar DNS para nodos Clearwater con la siguiente configuración del DNS"
# cat DNS
# cat DNS >> $DNS_clearwater
# cat DNS >> $DNS_clearwater1
echo "Archivo resolv.conf (RUTA:/etc/resolv.conf)"
cat $DNS_clearwater
echo "Archivo head (RUTA:/etc/resolvconf/resolv.conf.d/head)"
cat $DNS_clearwater1
cd ..

#CREAR ARCHIVO clearwater.list
echo "Crear archivo clearwater.list"
cd /etc/apt/sources.list.d/
prueba_archivo='clearwater.list'
touch $prueba_archivo 
echo "deb http://repo.cw-ngv.com/stable binary/" > $prueba_archivo
echo "Archivo Clearwater list"
Ruta_clearwater_list=/etc/apt/sources.list.d/clearwater.list
cat $Ruta_clearwater_list
cd ..
cd /etc/

#COCATENAR ARCHIVO clearwater_list CON EL ARCHIVO clearwater.list
# #EN EL ARCHIVO clearwater_list esta la configuracion de APT software sources
# cat clearwater_list >> $prueba_archivo 
# echo "Mover archivo clearwater.list a la carpeta /etc/apt/sources.list.d/"
# clearwater_list=/etc/apt/sources.list.d/
# mv clearwater.list $clearwater_list


#Variable url, llave key
echo "Crear llaves clearwater"
url=http://repo.cw-ngv.com/repo_key
#OPCIONAL SI NO TIENE CURL
# #sudo apt-get install curl
curl -L ${url} | sudo apt-key add -
echo "Revisar llaves"
sudo apt-key finger


echo "Actualizar linux"
sudo apt-get update

#DESHABILITAT FIREWALL
echo "Deshabilitar firewall"
ufw disable
echo "Mirar estado firewall"
ufw status 

echo "Crear carpeta clearwater e ingresar a la carpeta creada /etc/clearwater"
mkdir clearwater
cd clearwater
echo "Crear archivo local_config"
touch local_config
echo -e 'local_ip='$dime '\npublic_ip='$dime '\npublic_hostname=dime \netcd_cluster="'$bono,$sprout,$ellis,$homer,$vellum,$dime'"'> local_config
cat /etc/clearwater/local_config

echo "Instalar paquetes nodo Dime"
sudo DEBIAN_FRONTEND=noninteractive apt-get install dime clearwater-prov-tools --yes
echo "Primer paquete instalado"
echo "Instalar segundo paquete"
sudo DEBIAN_FRONTEND=noninteractive apt-get install clearwater-management --yes
echo "Segundo paquete instalado"
cd ..
echo "Crear archivos de recuperación del núcleo Clearwater"
echo "Archivo Parar Procesos Clearwater"
parar_proc=/etc/parar_proc.sh
echo "Creando script para parar los servicios del núcleo IMS de clearwater. Ruta:/etc/parar_proc.sh"
echo "#!/bin/bash 
# -*- ENCODING: UTF-8 -*- 
sudo monit stop -g etcd 
sudo monit stop -g clearwater_cluster_manager 
sudo monit stop -g clearwater_config_manager
sudo monit stop -g clearwater_queue_manager
sudo touch /etc/clearwater/no_cluster_manager
sudo rm -rf  /var/lib/clearwater-etcd/*
sleep 3s
echo 'Los servicios se pararon correctamente'" > $parar_proc
# cat parar_proc_IMS >> $parar_proc 
chmod 775 $parar_proc
chmod 777 $parar_proc

activar_proc=/etc/activar_nucleo.sh
echo "Creando script para activar los servicios del núcleo IMS de clearwater en /etc/activar_nucleo.sh"
# cat activar_nucleo_IMS >> $activar_proc 
echo "#!/bin/bash
# -*- ENCODING: UTF-8 -*-
#Nodo Vellum
#sudo /usr/share/clearwater/bin/run-in-signaling-namespace nodetool status

#Nodo Sprout
#sudo cw-validate_{shared|fallback}_ifcs_xml
echo 'Restableciendo núcleo'
sleep 1s
sudo clearwater-etcdctl cluster-health
sleep 2s
sudo clearwater-etcdctl member list
sleep 2s
sudo /usr/share/clearwater/clearwater-config-manager/scripts/check_config_sync
sleep 2s
sudo monit monitor -g etcd
sudo monit monitor -g clearwater_config_manager
sudo monit monitor -g clearwater_queue_manager
sleep 2s
sudo monit summary
#sudo /usr/share/clearwater/clearwater-cluster-manager/scripts/load_from_chronos_cluster vellum
#sudo /usr/share/clearwater/clearwater-cluster-manager/scripts/load_from_memcached_cluster vellum
#sudo /usr/share/clearwater/clearwater-cluster-manager/scripts/load_from_cassandra_cluster vellum
sleep 2s
sudo /usr/share/clearwater/clearwater-cluster-manager/scripts/check_cluster_state
sleep 2s
sudo rm /etc/clearwater/no_cluster_manager
sudo monit monitor -g clearwater_cluster_manager
sleep 2s
sudo monit summary" > $activar_proc
chmod 775 $activar_proc
chmod 777 $parar_proc
