
#!/bin/bash 

# repo="deb http://repo.cw-ngv.com/stable binary/" 
# sudo echo $repo >/etc/apt/sources.list.d/clearwater.list  
# sudo curl -L http://repo.cw-ngv.com/repo_key | sudo apt-key add - 
# sudo apt-key -y finger  
# sudo apt-get -y update 
# sudo mkdir /etc/clearwater 
ip=`hostname -I` 
local="local_ip=$ip" 
echo $local >/etc/clearwater/local_config  
# home_domain="home_domain= $1" 
# sudo echo $home_domain>/etc/clearwater/shared_config  
# sudo apt-get -y install clearwater-sip-stress  
# sudo apt-get -y install clearwater-sip-stress-coreonly



# sudo mkdir /etc/clearwater/test/


# echo "#!/bin/bash "> /etc/clearwater/test/execute.sh
# echo 'sudo cp /etc/clearwater/test/$1 /usr/share/clearwater/sip-stress/sip-stress.xml'>> /etc/clearwater/test/execute.sh
# echo 'sudo /usr/share/clearwater/infrastructure/scripts/sip-stress' >> /etc/clearwater/test/execute.sh
# echo 'sudo service clearwater-sip-stress restart' >>/etc/clearwater/test/execute.sh

# echo "sudo service clearwater-sip-stress stop">/etc/clearwater/test/stop_execute.sh