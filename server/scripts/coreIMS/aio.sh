# #!/bin/bash
echo "Crear Núcleo Clearwater Todo en Uno"
echo "#!/bin/bash 
set -e
mkdir /home/ubuntu/install
install_repo=http://repo.cw-ngv.com/stable # filled in by make_ovf.sh
updates_repo=http://repo.cw-ngv.com/stable # filled in by make_ovf.sh
curl -L https://raw.githubusercontent.com/Metaswitch/clearwater-infrastructure/master/scripts/clearwater-aio-install.sh | sudo bash -s clearwater-auto-config-generic $install_repo $updates_repo >/home/ubuntu/install/install.log 2>&1
mv /etc/rc2.d/S99zclearwater-aio-first-boot /home/ubuntu/install/
poweroff" > installScript
sudo chmod 775 installScript?
sudo cp installScript? /etc/rc2.d/S99zclearwater-aio-first-boot
sudo chmod a+x /etc/rc2.d/S99zclearwater-aio-first-boot
# /etc/rc2.d/S99zclearwater-aio-first-boot