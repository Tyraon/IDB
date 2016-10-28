= IDB

Eine gute aber nicht immer sehr leichte M�glichkeit Daten zu speichern, ist die IndexedDB des Webbrowsers. Um nun aber den komplizierten Vorgang zu Schreiben oder Auslesen von Daten zu vereinfachen, kann das IDB Objekt genutzt werden.
Hier wird nun in wenigen Schritten erkl�rt, wie IDB genutzt werden kann.


== Erste Nutzung von IDB

Als erste laden wir uns das IDB von herunter.
und kopieren uns nun die idb.js in das Verzeichnis in dem wir arbeiten.

Zu beachten ist, dass f�r die Ausgabe jQuery genutzt wird. Daher m�ssen 2 Scripte in die HTML Date eingebunden werden.



<head>
<script src="https://code.jquery.com/jquery-2.0.3.js"></script>
<script src="idb.js"></script>


Da wir das IDB nun eingebunden haben k�nnen wir es auch nutzen.
Als erstes m�ssen wir einen Datenbanknamen vergeben, wie in diesem Beispiel 'testdb' und einen Namen f�r die Tabelle 'testtabelle'.



<script>
var idb_db='testdb';
var idb_os='testtabelle';


Hier haben wir der Variable 'idb_db' den Namen zugewiesen um dem IDB zu sagen wie die Datenbank hei�t. In der Variable 'idb_os' haben wir unseren Namen f�r die Tabelle eingegeben.

WARNING: Zu beachten ist, dass die Variablen 'idb_db' (Name f�r Database) und 'idb_os' (Name f�r ObjectStore der Database) nicht anders benannt werden.

Da wir die Namen f�r die Datenbank und die Tabelle definiert haben, werden diese automatisch erzeugt und dann auch jedesmal angesprochen.
Ab jetzt brauchen wir IDB nur noch sagen was wir mit der Datenbank machen wollen.

Als erstes schreiben wir einen Datensatz in die Tabelle unserer Datenbank:



var datensatz = {
                name:"Test",
                inhalt:"Testeintrag!"
                }

idb.dbwrite(datensatz);


Zuerst haben wir einen Datensatz erstellt in dem wir die Daten abgelegt haben die wir nun speichern wollen.
Darunter haben wir dann mit einem einfachen Befehl (idb.dbwrite()) den Datensatz an IDB �bergeben und wurde dann in die Datenbank gespeichert.

Nun wollen wir uns diese Daten ausgeben lassen:


idb.dbread([1],function(e){console.dir(e.target.result);});


Diese Zeile ist recht klein, enth�lt jedoch alle notwendigen Informationen. Als erstes geben wir den Key des Datensatzes an (als Array[]) den wir ausgeben lassen wollen. Der zweite Parameter ist eine Callback-Funktion bei Erfolg. In unserem Fall lassen wir uns das Ergebnis in der Konsole ausgeben. Der dritte Parameter w�re eine Callback-Funktion f�r denn Fall, dass es keinen Erfolg gibt.

TIP: Die Datenbank beginnt bei dere Z�hlung der Keys mit 1 und nicht wie javascript bei 0.

Mit so kurzen Zeilen k�nnen wir nun eine Menge bewegen.


== Befehlsreferenz

.*dbwrite(daten)*
- zu speichernde Daten

.*dbread([key],callback[success],callback[error])*
- key => Schl�ssel(als Array) des Datensatzes in der Datenbank
- callback[success] => bei Erfolg
- callback[error] => bei keinem Erfolg

.*dbreadTo(key,callback[success],callback[error][,direction])*
- key => Fragt alle Datens�tze aus der Datenbank bis zum Key ab.
- callback[success] => bei Erfolg
- callback[error] => bei keinem Erfolg
- direction => Gibt die Richtung an in der die Datens�tze ausgelesen werden sollen (next, rev) und ist optional

.*dbreadFrom(key,callback[success],callback[error][,direction])*
- key => Fragt alle Datens�tze aus der Datenbank ab dem Key bis zum Ende ab.
- callback[success] => bei Erfolg
- callback[error] => bei keinem Erfolg
- direction => Gibt die Richtung an in der die Datens�tze ausgelesen werden sollen (next, rev) und ist optional

.*dbreadRange(von,bis,callback[success],callback[error][,direction])*
- von => Fragt alle Datens�tze aus der Datenbank ab dem Key ab.
- bis => Fragt alle Datens�tze aus der Datenbank bis zum Key ab.
- callback[success] => bei Erfolg
- callback[error] => bei keinem Erfolg
- direction => Gibt die Richtung an in der die Datens�tze ausgelesen werden sollen (next, rev) und ist optional

.*dbupdate(daten,key)*
- daten => Der neue Datensatz, welcher gespeichert werden soll
- key => Schl�ssel des Datensatzes der �berschrieben werden soll

.*dbdelete(key)*
- key => Schl�ssel des Datensatzes der gel�scht werden soll