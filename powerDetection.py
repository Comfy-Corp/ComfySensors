import RPi.GPIO as GPIO
import datetime as dt
import time
import MySQLdb
import datetime

conn = MySQLdb.connect("localhost", "root", "comfy", "data")
GPIO.setmode(GPIO.BCM)
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)

x = conn.cursor()

try:
	while True:
		GPIO.wait_for_edge(22, GPIO.FALLING)
		timestamp = dt.datetime.now()
		print timestamp
		x.execute("""INSERT INTO spins(date) VALUES ('%s')""" % (timestamp))
		conn.commit()
		x.execute("SELECT id, UNIX_TIMESTAMP(date) FROM spins ORDER BY id DESC LIMIT 2")
                results = x.fetchall()
		delay = results[0][1] - results[1][1]		
		watt = 3600 / (187.5 * delay) * 1000;
		fixedwatt = round(watt,2)			
		x.execute("INSERT INTO watt(watt) VALUES ('%f')" % (fixedwatt))
		conn.commit()		
		time.sleep(2)
except KeyboardInterrupt:
	GPIO.cleanup()
	conn.close()
	print('Error interupt')
except Exception,e:
	GPIO.cleanup()
	conn.close()
	print str(e)
	print("Error mysql")
