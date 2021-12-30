const refranero = [
	' A barriga llena, corazón contento.',
	' A buen entendedor, pocas palabras bastan.',
	' A buen hambre, no hay pan duro.',
	' ¡A buenas horas, mangas verdes!',
	' A burro muerto, la cebada al rabo.',
	' A caballo regalado no le mires el diente.',
	' A cada cerdo le llega su San Martín.',
	' A Dios rogando y con el mazo dando.',
	' A enemigo que huye, puente de plata.',
	' A falta de pan, buenas son tortas.',
	' A grandes males, grandes remedios.',
	' A gusto de los cocineros comen los frailes.',
	' A la arrogancia en el pedir, la virtud del no dar.',
	' A la cama no te irás sin saber una cosa más.',
	' A la tercera va la vencida.',
	' A la vejez, viruelas.',
	' A lo hecho, pecho.',
	' A mal tiempo, buena cara.',
	' A más años, más desengaños.',
	' A nadie le amarga un dulce.',
	' A otro perro con ese hueso.',
	' A palabras necias, oídos sordos.',
	' A perro flaco, todo son pulgas.',
	' A quien cuece y amasa, de todo le pasa.',
	' A quien madruga, Dios le ayuda.',
	' A quien mucho tiene, más le viene.',
	' A rey muerto, rey puesto.',
	' A río revuelto, ganancia de pescadores.',
	' A todo se acostumbra uno, menos a no comer.',
	' A un clavo ardiendo se agarra el que se está hundiendo.',
	' Abril, aguas mil.',
	' Afortunado en el juego, desafortunado en amores.',
	' Agua pasada no mueve molino.',
	' Agua que no has de beber déjala correr.',
	' Ahora adulador, mañana traidor.',
	' Al mejor cazador, se le va la liebre.',
	' Al pan, pan, y al vino, vino.',
	' Al perro flaco, todo se le vuelven pulgas.',
	' Al que Dios se la dé, San Pedro se la bendiga.',
	' Al que le pique, que se rasque.',
	' Al revés te lo digo para que me entiendas.',
	' Algo tendrá el agua cuando la bendicen.',
	' Amigo por interés no dura porque no lo es.',
	' Amor con amor se paga.',
	' Amores reñidos son los más queridos.',
	' Ande yo caliente y ríase la gente.',
	' Ante la duda, la más tetuda.',
	' Antes de hacer nada, consúltalo con la almohada.',
	' Antes de meter, prometer.',
	' Antes se coge al mentiroso que al cojo.',
	' Año de nieves, año de bienes.',
	' Aprendiz de mucho, maestro de nada.',
	' Arrieros somos, y en el camino nos encontraremos.',
	' Asno con oro, alcánzalo todo.',
	' Aunque la mona se vista de seda. mona se queda.',
	' Ave que vuela, a la cazuela.',
	' Bicho malo nunca muere.',
	' Bien está lo que bien acaba.',
	' Bien predica quien bien vive.',
	' Buey viejo, surco derecho.',
	' Caballo grande, ande o no ande.',
	' Cada cosa a su tiempo.',
	' Cada loco con su tema.',
	' Cada maestrillo tiene su librillo.',
	' Cada mochuelo a su olivo.',
	' Cada moneda tiene dos caras.',
	' Cada oveja con su pareja.',
	' Cada palo aguante su vela.',
	' Cada persona es dueña de su silencio y esclava de sus palabras.',
	' Cada uno cuenta de la feria como le va en ella.',
	' Cada uno en su casa, y Dios en la de todos.',
	' Cada uno lleva su cruz.',
	' Cada uno sabe dónde le aprieta el zapato.',
	' Cada uno se conoce por sus obras.',
	' Cada uno tiene lo que se merece.',
	' Calumnia, que algo queda.',
	' Casa con dos puertas, mala es de guardar.',
	' Casarás y amansarás.',
	' Como éramos pocos, parió la abuela.',
	' Como se vive, se muere.',
	' Como siembres, recogerás.',
	' Con el roce, nace el cariño.',
	' Con la ayuda del vecino, mató mi padre un cochino.',
	' Con la intención basta.',
	' Con la verdad se llega a todas partes.',
	' Con las glorias se olvidan las memorias.',
	' Con pan y vino, se anda el camino.',
	' Consejos vendo, y para mí no tengo.',
	' Contigo, pan y cebolla.',
	' Contra el vicio de pedir, la virtud de no dar.',
	' Contra la fortuna, no hay arte alguna.',
	' Corazón codicioso, no tiene reposo.',
	' Coser y cantar, todo es empezar.',
	' Cree el ladrón que todos son de su condición.',
	' Cría fama y échate a dormir.',
	' Cría cuervos y te sacarán los ojos.',
	' Cuando el diablo no tiene nada que hacer, mata moscas con el rabo.',
	' Cuando el gato no está, los ratones bailan.',
	' Cuando el grajo vuela bajo, hace un frío del carajo.',
	' Cuando el río suena, agua lleva.',
	' Cuando las barbas del vecino veas pelar, pon las tuyas a remojar.',
	' Cuando menos se piensa, salta la liebre.',
	' Cuando una puerta se cierra, otra se abre.',
	' Cuanto más se tiene, más se quiere.',
	' Cuanto más viejo, más pellejo.',
	' Cuidados ajenos mataron al asno.',
	' Culo veo, culo deseo.',
	' Da Dios almendras al que no tiene muelas.',
	' Dame pan, y dime tonto.',
	' Date prisa despacio, y llegarás a palacio.',
	' De aquellos polvos, vienen estos lodos.',
	' De buen vino, buen vinagre.',
	' De casta le viene al galgo el ser rabilargo.',
	' De desagradecidos está el infierno lleno.',
	' De donde no hay, no se puede sacar.',
	' De la calle vendrá, quien de tu casa te echará.',
	' De grandes cenas están las sepulturas llenas.',
	' De herrero a herrero, no pasa dinero.',
	' De ilusión también se vive.',
	' De la discusión nace la luz.',
	' De lo que no cuesta, llena la cesta.',
	' De lo que no veas, ni la mitad te creas.',
	' De lo que se come se cría.',
	' De los amigos me guarde Dios, que de los enemigos me guardo yo.',
	' De los cuarenta para arriba, no te mojes la barriga.',
	' De los escarmentados nacen los avisados.',
	' De mí te reirás, pero de mi dinero, no.',
	' De noche todos los gatos son pardos.',
	' De perdidos, al río.',
	' De tal cepa, tal vino.',
	' De tal palo, tal astilla.',
	' De todo hay en la viña del Señor.',
	' De trigo y avena, mi casa llena.',
	' De una cebolla no nace una rosa.',
	' Del agua mansa líbreme Dios, que de la brava me libraré yo.',
	' Del amor al odio hay un paso.',
	' Del árbol caído, todos hacen leña.',
	' Del dicho al hecho hay un buen trecho.',
	' Del jefe y del mulo cuanto más lejos más seguro.',
	' Del mar, el mero; de la tierra, el cordero.',
	' Del viejo, el consejo.',
	' Dentro de cien años, todos calvos.',
	' Desdichas y caminos hacen amigos.',
	' Desgracia compartida, menos sentida.',
	' Desgraciado en el juego, afortunado en amores.',
	' Desnudar un santo para vestir otro.',
	' Desnudo nací, desnudo me hallo: ni pierdo ni gano.',
	' Después de beber, cada uno dice su parecer.',
	' Después de la tempestad, viene la calma.',
	' Detrás de la cruz está el diablo.',
	' Día de Santa Lucía, mengua la noche y crece el día.',
	' Días de mucho, vísperas de nada.',
	' Dicho y hecho.',
	' Diciendo las verdades se pierden amistades.',
	' Dime con quien andas y te diré quien eres.',
	' Dime de que presumes y te diré de que careces.',
	' Dinero llama dinero.',
	' Dios aprieta pero no ahoga.',
	' Dios los cría y ellos se juntan.',
	' Divide y vencerás.',
	' Donde dije digo, digo Diego.',
	' Donde fueres, haz lo que vieres.',
	' Donde hay confianza, da asco.',
	' Donde hay patrón, no manda marinero.',
	' Donde las dan las toman.',
	' Donde manda el corazón, la cabeza tiene poco que decir.',
	' Donde menos se piensa salta la liebre.',
	' ¿Dónde va Vicente?, donde va la gente.',
	' Dos es compañía, tres es multitud.',
	' Dos no riñen, si uno no quiere.',
	' Dos que duermen en un colchón, se vuelven de la misma condición.',
	' El amor es ciego.',
	' El avaro, cuanto más tiene, más quiere.',
	' El bien viene andando; el mal, volando.',
	' El buen cirujano corta por lo sano.',
	' El buen paño en el arca se vende.',
	' El buen perfume se vende en frasco pequeño.',
	' El buey suelto, bien se lame.',
	' El casado, casa quiere.',
	' El comer y el rascar, todo es empezar.',
	' El dinero hace caballero.',
	' El fin justifica los medios.',
	' El fruto prohibido es el más apetecido.',
	' El gato escaldado, del agua fría huye.',
	' El hábito no hace al monje.',
	' El hambre aguza el ingenio.',
	' El hambre es muy mala consejera.',
	' El hombre es el único animal que tropieza dos veces en la misma piedra.',
	' El hombre propone, y Dios dispone.',
	' El hombre y el oso, cuanto más feo, más hermoso.',
	' El huésped y el pez, a los tres días hiede.',
	' El invierno no es pasado mientras abril no es terminado.',
	' El llanto, sobre el difunto.',
	' El lloro de la mujer, no es de creer.',
	' El mejor escribano echa un borrón.',
	' El mentiroso ha de ser memorioso.',
	' El muerto al hoyo y el vivo al bollo.',
	' El mundo es un pañuelo.',
	' El ocio no quede impune; quien no trabaje, que ayune.',
	' El ojo del amo engorda el caballo.',
	' El perro del hortelano, ni come ni deja comer al amo.',
	' El pez grande se come al chico.',
	' El poeta nace, no se hace.',
	' El que a buen árbol se arrima, buena sombra le cobija.',
	' El que a hierro mata, a hierro muere.',
	' El que al cielo escupe en la cara le cae.',
	' El que algo quiere, algo le cuesta.',
	' El que avisa no es traidor.',
	' El que busca halla.',
	' El que calla, otorga.',
	' El que espera, desespera.',
	' El que esté libre de pecado, que tire la primera piedra.',
	' El que fue a Sevilla perdió su silla.',
	' El que guarda, siempre tiene.',
	' El que la sigue, la consigue.',
	' El que mucho corre, pronto para.',
	' El que mucho habla, mucho yerra.',
	' El que mucho ofrece, poco da.',
	' El que no llora, no mama.',
	' El que no quiera polvo, que no vaya a la era.',
	' El que no se consuela, es porque no quiere.',
	' El que no trabaja, no come.',
	' El que parte y reparte, se queda con la mejor parte.',
	' El que pega primero, pega dos veces.',
	' El que quiera peces que se moje el culo.',
	' El que ríe el último, ríe mejor.',
	' El que rompe, paga.',
	' El que se excusa, se acusa.',
	' El que se pica, ajos come.',
	' El que siembra viento, cosecha tempestades.',
	' El que tiene boca, se equivoca.',
	' El que tiene padrino se bautiza.',
	' El que tiene un tío en Alcalá, ni tiene tío ni tiene ná.',
	' El que tuvo, retuvo.',
	' El que venga detrás, que arree.',
	' El que vive de favores, sirve a muchos señores.',
	' El saber no ocupa lugar.',
	' El sabio siempre quiere aprender, el ignorante siempre quiere enseñar.',
	' El tiempo es oro.',
	' El tiempo lo dirá.',
	' El tiempo perdido no se recupera.',
	' El tiempo pone a cada uno en su sitio.',
	' El tiempo todo lo cura.',
	' En boca cerrada no entran moscas.',
	' En casa del herrero, cuchillo de palo.',
	' En casa del pobre, dura poco la alegría.',
	' En el país de los ciegos, el tuerto es el rey.',
	' En febrero busca la sombra el perro.',
	' En la guerra y en el amor, todo vale.',
	' En la tardanza está el peligro.',
	' En la variedad está el gusto.',
	' En martes, ni te cases ni te embarques.',
	' En tiempo de higos no hay amigos.',
	' En todas partes cuecen habas.',
	' Encender una vela a Dios y otra al diablo.',
	' Entre col y col, lechuga.',
	' Entre dos amigos, un notario y dos testigos.',
	' Entre todos la mataron y ella sola se murió.',
	' Es buena noticia el que no las haya.',
	' Es de bien nacidos ser agradecidos.',
	' Es la gota que desborda el vaso.',
	' Es peor el remedio que la enfermedad.',
	' Escoba nueva barre bien.',
	' Gallina vieja hace buen caldo.',
	' Gallo que no canta, algo tiene en la garganta.',
	' Gato con guantes no caza ratones.',
	' Gato escaldado, del agua fría huye.',
	' Genio y figura, hasta la sepultura.',
	' Gota a gota, se llena la bota.',
	' Gusta lo ajeno más por ajeno que por bueno.',
	' Hablando del rey de Roma, por la puerta asoma.',
	' Hablando se entiende la gente.',
	' Habló el buey y dijo mu.',
	' Haciendo y deshaciendo se va aprendiendo.',
	' Hambre que espera hartura, no es hambre pura.',
	' Hasta el cuarenta de mayo no te quites el sayo.',
	' Hasta el rabo, todo es toro.',
	' Hay más días que longanizas.',
	' Haz bien y no mires a quien.',
	' Hijo sin dolor, madre sin amor.',
	' Hombre prevenido, vale por dos.',
	' Hoy por ti, mañana por mí.',
	' Huir del fuego para caer en las brasas.',
	' Ir por lana y volver trasquilado.',
	' Jaula nueva, pájaro muerto.',
	' Juan Palomo, yo me lo guiso y yo me lo como.',
	' Juego y bebida, casa perdida.',
	' La arruga es bella.',
	' La ausencia causa olvido.',
	' La avaricia rompe el saco.',
	' La cabra siempre tira al monte.',
	' La cara es el espejo del alma.',
	' La caridad bien entendida empieza por uno mismo.',
	' La casa se arruina por la cocina.',
	' La costumbre hace ley.',
	' La curiosidad mató al gato.',
	' La ensalada, poco vinagre y bien aceitada.',
	' La esperanza es lo último que se pierde.',
	' La excepción confirma la regla.',
	' La experiencia es la madre de la ciencia.',
	' La fe mueve montañas.',
	' La gallina de mi vecina más huevos pone que la mía.',
	' La hermosura poco dura.',
	' La ignorancia de la ley no excusa su cumplimiento.',
	' La intención es lo que vale.',
	' La juventud tiene la fuerza y la vejez la prudencia.',
	' La lengua no tiene hueso, pero corta lo más grueso.',
	' La letra con sangre entra.',
	' La ley del embudo, para mí lo ancho y para ti lo agudo.',
	' La manzana podrida pierde a su compañía.',
	' La mejor palabra siempre es la que queda por decir.',
	' La mejor salsa, el apetito.',
	' La mujer del César, además de ser honesta, debe parecerlo.',
	' La mujer y el oro, lo pueden todo.',
	' La mujer y el vino sacan al hombre de tino.',
	' La música amansa las fieras.',
	' La ocasión la pintan calva.',
	' La palabra es plata y el silencio es oro.',
	' La palabra que sale de la boca, nunca torna.',
	' La peor gallina es la que más cacarea.',
	' La perseverancia todo lo alcanza.',
	' La primavera la sangre altera.',
	' La procesión va por dentro.',
	' La realidad supera la ficción.',
	' La respuesta mansa la ira quebranta.',
	' La suegra y el doctor, cuanto más lejos, mejor.',
	' La suerte de la fea, la bonita la desea.',
	' La suerte está echada.',
	' La unión hace la fuerza.',
	' La venganza es un plato que se sirve frío.',
	' La verdad es amarga.',
	' La vida no es un camino de rosas.',
	' La viuda rica hace que llora y repica.',
	' Las apariencias engañan.',
	' Las armas de fuego, cuanto más lejos, mejor.',
	' Las comparaciones son odiosas.',
	' Las cosas de palacio van despacio.',
	' Las cuentas claras, y el chocolate espeso.',
	' Las desgracias nunca vienen solas.',
	' Las madres hacendosas hacen las hijas perezosas.',
	' Las malas noticias vuelan.',
	' Las palabras vuelan, y lo escrito permanece.',
	' Las paredes oyen.',
	' Las prisas nunca son buenas.',
	' Libro prestado, libro perdido.',
	' Lo barato sale caro.',
	' Lo bien hecho, bien parece.',
	' Lo bueno poco dura.',
	' Lo bueno, si breve, dos veces bueno.',
	' Lo comido por lo servido.',
	' Lo cortés no quita lo valiente.',
	' Lo fiado, rara vez pagado.',
	' Lo olvidado, ni agradecido ni pagado.',
	' Lo prometido es deuda.',
	' Lo que a unos mata, a otros sana.',
	' Lo que bien empieza, bien acaba.',
	' Lo que de noche se hace, a la mañana parece.',
	' Lo que en los libros no está, la vida te lo enseñará.',
	' Lo que es moda no incomoda.',
	' Lo que mucho vale, mucho cuesta.',
	' Lo que no has de comer, déjalo cocer.',
	' Lo que no mata, engorda.',
	' Lo que no se comienza, nunca se acaba.',
	' Lo que no se llevan los ladrones, aparece por los rincones.',
	' Lo que no va en lágrimas va en suspiros.',
	' Lo que otro suda, a mí poco me dura.',
	' Lo que poco cuesta, poco se aprecia.',
	' Lo que se aprende en la cuna, siempre dura.',
	' Lo que sea sonará.',
	' Los amigos de mis amigos son mis amigos.',
	' Los amigos de mis amigos son mis amigos.',
	' Los años no pasan en balde.',
	' Los árboles no dejan ver el bosque.',
	' Los celos son malos consejeros.',
	' Los duelos con pan, son menos.',
	' Los huéspedes mucho gusto dan, pero cuando se van.',
	' Los malos tragos hay que pasarlos pronto.',
	' Los niños y los locos dicen las verdades.',
	' Los toros se ven mejor desde la barrera.',
	' Los trapos sucios se lavan en casa.',
	' Mal de muchos, consuelo de tontos.',
	' Mañana será otro día.',
	' Manitas que no dais, ¿qué esperáis?',
	' Manos frías, corazón caliente.',
	' Marido celoso no tiene reposo.',
	' Marzo ventoso y abril lluvioso sacan a mayo florido y hermoso.',
	' Más hace el que quiere que el que puede.',
	' Más discurre un hambriento que cien letrados.',
	' Más sabe el diablo por viejo que por diablo.',
	' Más vale caer en gracia que ser gracioso.',
	' Más vale estar solo que mal acompañado.',
	' Más vale gastar en pan que en botica.',
	' Más vale llegar a tiempo que rondar un año.',
	' Más vale malo conocido que lo bueno por conocer.',
	' Más vale maña que fuerza.',
	' Más vale pájaro en mano que ciento volando.',
	' Más vale prevenir que curar.',
	' Más vale ser arriero que borrico.',
	' Más vale tarde que nunca.',
	' Más vale tener que desear.',
	' Más vale tuerto que ciego.',
	' Más vale un mal arreglo que un buen pleito.',
	' Más ven cuatro ojos que dos.',
	' Mejor dar que recibir.',
	' Mucho ruido y pocas nueces.',
	' Muchos son los llamados y pocos los escogidos.',
	' Muerto el perro, se acabó la rabia.',
	' Nadie da lo que no tiene.',
	' Nadie es profeta en su tierra.',
	' Nadie escarmienta en cabeza ajena.',
	' Nadie se acuerda de Santa Bárbara hasta que truena.',
	' Nadie se meta donde no le llamen.',
	' Nadie tira piedras a su tejado.',
	' Ni pidas a quien pidió, ni sirvas a quien sirvió.',
	' Ni son todos los que están, ni están todos los que son.',
	' Ni tanto ni tan calvo.',
	' Ningún jorobado ve su joroba.',
	' Ninguno escarmienta en cabeza ajena.',
	' No basta ser bueno sino parecerlo.',
	' No cantan dos gallos en un gallinero.',
	' No cantes gloria hasta el fin de la victoria.',
	' No cojas la pera hasta que esté madura.',
	' No comer por haber comido no es tiempo perdido.',
	' No con quien naces sino con quien paces.',
	' No dejes para mañana lo que puedas hacer hoy.',
	' No echéis margaritas a los cerdos.',
	' No es lo mismo ser que parecer.',
	' No es más limpio el que más limpia, sino el que menos ensucia.',
	' No es más rico quien más tiene sino el que menos necesita.',
	' No es oro todo lo que reluce.',
	' No es tan fiero el león como lo pintan.',
	' No hay don sin din.',
	' No hay enemigo pequeño.',
	' No hay harina sin salvado.',
	' No hay mal que cien años dure.',
	' No hay mal que por bien no venga.',
	' No hay mayor desprecio que no hacer aprecio.',
	' No hay peor ciego que el que no quiere ver.',
	' No hay peor sordo que el que no quiere oír.',
	' No hay primavera sin flores ni verano sin calores.',
	' No hay que empezar la casa por el tejado.',
	' No hay que fiarse de las apariencias.',
	' No hay que vender la piel del oso antes de haberlo cazado.',
	' No hay regla sin excepción.',
	' No hay rosa sin espinas.',
	' No hay tonto que no se tenga por listo.',
	' No muerdas la mano que te da de comer.',
	' No ofende quien quiere sino quien puede.',
	' No por mucho madrugar, amanece más temprano.',
	' No quieres caldo, pues toma tres tazas.',
	' No sabes lo que tienes hasta que lo pierdes.',
	' No se acuerda el cura de cuando fue sacristán.',
	' No se ganó Zamora en una hora.',
	' No se hizo la miel para la boca del asno.',
	' No se puede estar en misa y repicando.',
	' No se puede hacer tortilla sin romper los huevos.',
	' No sólo de pan vive el hombre.',
	' No te cierres una puerta, si no has abierto otra.',
	' No te rías del mal de vecino, que el tuyo viene de camino.',
	' No tires piedras sobre tu tejado.',
	' No todo el monte es orégano.',
	' No vendas la piel de oso antes de haberlo cazado.',
	' Nuestro gozo en un pozo.',
	' Nunca digas de este agua no beberé.',
	' Nunca es tarde si la dicha es buena.',
	' Nunca falta un roto para un descosido.',
	' Nunca llueve a gusto de todos.',
	' Nunca segundas partes fueron buenas.',
	' Obras son amores, que no buenas razones.',
	' Ojo por ojo, diente por diente.',
	' Ojos que no ven, corazón que no siente.',
	' Otro vendrá que bueno me hará.',
	' Oveja que bala, bocado que pierde.',
	' Palos con gusto no duelen.',
	' Pan con pan, comida de tontos.',
	' Pan para hoy, y hambre para mañana.',
	' Para ese viaje no se necesitan alforjas.',
	' Para muestra, un botón.',
	' Paso a paso se va lejos.',
	' Pelillos a la mar.',
	' Perro ladrador, poco mordedor.',
	' Pesar ajeno, no quita el sueño.',
	' Piensa el ladrón que todos son de su condición.',
	' Piensa mal y acertarás.',
	' Pleitos tengas y los ganes.',
	' Poco a poco se llega antes.',
	' Pocos y mal avenidos.',
	' Poderoso caballero es don dinero.',
	' Por dinero baila el perro.',
	' Por el canto se conoce el pájaro.',
	' Por el hilo se saca el ovillo.',
	' Por el interés, te quiero Andrés.',
	' Por la boca muere el pez.',
	' Por San Blas la cigüeña verás.',
	' Por sus frutos los conoceréis.',
	' Por un clavo se pierde una herradura.',
	' Por un oído me entra y por otro me sale.',
	' Por un perro que maté, mataperros me llamaron.',
	' Preguntando se va a Roma.',
	' Primero es la obligación que la devoción.',
	' Que cada palo aguante su vela.',
	' Querer es poder.',
	' Quien a buen árbol se arrima buena sombra le cobija.',
	' Quien a hierro mata, a hierro muere.',
	' Quien bien ata, bien desata.',
	' Quien bien siembra bien recoge.',
	' Quien bien te quiere, te hará llorar.',
	' Quien busca halla.',
	' Quien calla otorga.',
	' Quien con fuego juega se quema.',
	' Quien con lobos anda, a aullar se enseña.',
	' Quien con niños se acuesta mojado amanece.',
	' Quien da pan a perro ajeno pierde pan y pierde perro.',
	' Quien da primero, da dos veces',
	' Quien de joven no trabaja de viejo duerme en la paja.',
	' Quien enferma de locura, no tiene cura.',
	' Quien esté libre de culpa que tire la primera piedra.',
	' Quien guarda, halla.',
	' Quien hace lo que puede no está obligado a más.',
	' Quien hizo la ley hizo la trampa.',
	' Quien llega tarde, ni oye misa ni come carne.',
	' Quien mal anda mal acaba.',
	' Quien más pone, más pierde.',
	' Quien más tiene, más quiere.',
	' Quien mucho abarca poco aprieta.',
	' Quien mucho duerme, poco aprende.',
	' Quien nace lechón, muere cochino.',
	' Quien no barbecha no cosecha.',
	' Quien no se arriesga, no pasa la mar.',
	' Quien no siembra no recoge.',
	' Quien no te conoce que te compre.',
	' Quien no tenga cabeza, que tenga pies.',
	' Quien no tiene padrino, no se bautiza.',
	' Quien paga descansa.',
	' Quien paga manda.',
	' Quien tiene boca se equivoca.',
	' Quien predica en el desierto pierde el sermón.',
	' Quien roba a un ladrón, tiene cien años de perdón.',
	' Quien se pica ajos come.',
	' Quien siembra vientos recoge tempestades.',
	' Quien tiene un amigo tiene un tesoro.',
	' Quien todo lo quiere, todo lo pierde.',
	' Rectificar es de sabios.',
	' Renovarse o morir.',
	' Reunión de pastores, oveja muerta.',
	' Resultó peor el remedio que la enfermedad.',
	' Salir de Guatemala y entrar en Guatepeor.',
	' Santa Rita, Rita, lo que se da no se quita.',
	' Sarna con gusto no pica.',
	' Se dice el pecado pero no el pecador.',
	' Se dice el pecado pero no el pecador.',
	' Si dices las verdades, pierdes las amistades.',
	' Si hay trato, pueden ser amigos perro y gato.',
	' Si la envidia fuera tiña, ¡cuántos tiñosos habría!.',
	' Si la montaña no va a Mahoma, Mahoma va a la montaña.',
	' Si no puedes con tu enemigo, únete a él.',
	' Si no quieres una taza, taza y media.',
	' Si no te envidia nadie, poco vales.',
	' Si te mandare tu mujer arrojarte de un tajo, ruega a Dios que sea bajo.',
	' Siempre sale a hablar quien tiene por qué callar.',
	' Sobre gustos no hay nada escrito.',
	' Tal amo, tal criado.',
	' Tanto tienes, tanto vales.',
	' Tanto va el cántaro a la fuente que al final se rompe.',
	' Tirar la piedra y esconder la mano.',
	' Todo se pega menos la hermosura.',
	' Todo tiene remedio menos la muerte.',
	' Tras cornudo, apaleado.',
	' Tripa vacía, corazón sin alegría.',
	' Un clavo saca otro clavo.',
	' Un grano no hace granero, pero ayuda al compañero.',
	' Una aguja en un pajar, es difícil de encontrar.',
	' Una cosa es predicar y otra dar trigo.',
	' Una imagen vale más que mil palabras.',
	' Una mano lava a la otra, y ambas la cara.',
	' Una vez te casarás y mil te arrepentirás.',
	' Unos lo siembran, y otros lo siegan.',
	' Unos nacen con estrella y otros estrellados.',
	' Unos por otros, la casa sin barrer.',
	' Unos tanto y otros tan poco.',
	' Unos tienen la fama, y otros cardan la lana.',
	' Uso hace maestro.',
	' Vemos la paja en el ojo ajeno, y no vemos la viga en el nuestro.',
	' Vísteme despacio que tengo prisa.',
	' Zapatero, a tus zapatos.',
	' Zurrón de mendigo, nunca bien henchido.',
];

export default refranero