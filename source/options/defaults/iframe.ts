// stolen from https://github.com/gwern/gwern.net/blob/1bb7737e59eba4ff1579b7fb2d7ad2e2402ce847/build/LinkLive.hs
// Todo maintain in sync?
/* eslint-disable comma-style, @typescript-eslint/quotes, quotes */
const goodGwernDomains = [
	"1dollarscan.com"
	, "80000hours.org"
	, "abandonedfootnotes.blogspot.com"
	, "academic.oup.com"
	, "academic.oup.com"
	, "academictorrents.com"
	, "ageing.oxfordjournals.org"
	, "ai.googleblog.com"
	, "aje.oxfordjournals.org"
	, "apenwarr.ca"
	, "archive.org"
	, "archive.ph"
	, "archivebox.io"
	, "bam-dataset.org"
	, "bam.kalzumeus.com"
	, "beepb00p.xyz"
	, "bellard.org"
	, "blog.beeminder.com"
	, "blog.google.com"
	, "blog.otoro.net"
	, "blog.pinboard.in"
	, "blogs.nvidia.com"
	, "bmk.sh"
	, "boingboing.net"
	, "camelcamelcamel.com"
	, "cat-unbound.org"
	, "causal-effects.com"
	, "citeseerx.ist.psu.edu"
	, "clinicaltrials.gov"
	, "conifer.rhizome.org"
	, "cran.r-project.org"
	, "ctan.org"
	, "danluu.com"
	, "danwang.co"
	, "distill.pub"
	, "docs.google.com"
	, "duckduckgo.com"
	, "dwarffortresswiki.org"
	, "en.bitcoin.it"
	, "en.touhouwiki.net"
	, "en.wikibooks.org"
	, "en.wikichip.org"
	, "en.wikifur.com"
	, "en.wikiquote.org"
	, "en.wikisource.org"
	, "en.wiktionary.org"
	, "equilibriabook.com"
	, "eurekamaga.com"
	, "everything2.com"
	, "explorabl.es"
	, "feeds.feedburner.com"
	, "files.eric.ed.gov"
	, "forum.effectivealtruism.org"
	, "forum.evageeks.org"
	, "foundation.wikimedia.org"
	, "fullfrontal.moe"
	, "greaterwrong.com"
	, "guzey.com"
	, "idlewords.com"
	, "iqcomparisonsite.com"
	, "jamanetwork.com"
	, "jasoncrawford.org"
	, "jtoomim.org"
	, "kalzumeus.com"
	, "keras.io"
	, "kill-the-newsletter.com"
	, "kk.org"
	, "knightcolumbia.org"
	, "ledge-cli.org"
	, "lesswrong.com"
	, "libgen.rs"
	, "library.bz"
	, "marginalrevolution.com"
	, "mattlakeman.org"
	, "mc-stan.org"
	, "meta.wikimedia.org"
	, "michaelnielsen.org"
	, "ncase.me"
	, "nintil.com"
	, "norvig.com"
	, "notes.pinboard.in"
	, "numinous.productions"
	, "nymag.com"
	, "openai.com"
	, "ourworldindata.org"
	, "pandoc.org"
	, "papers.ssrn.com"
	, "parametric.press"
	, "patrickcollison.com"
	, "pdfs.semanticscholar.org"
	, "personalitytest.net"
	, "philpapers.org"
	, "pinboard.in"
	, "plato.stanford.edu"
	, "playground.tensorflow.org"
	, "popcon.ubuntu.com"
	, "press.etc.cmu.edu"
	, "progressstudies.school"
	, "psychcentral.com"
	, "publicdomainreview.org"
	, "publishing.cdlib.org"
	, "qntm.org"
	, "quantum.country"
	, "qwantz.com"
	, "racket-lang.org"
	, "rationality.org"
	, "rdiff-backup.net"
	, "ricon.dev"
	, "rootsofprogress.org"
	, "row1.ca"
	, "safebooru.org"
	, "scholars-stage.org"
	, "sciencebasedmedicine.org"
	, "sevensecularsermons.org"
	, "shiny.app"
	, "sifter.org"
	, "slatestarcodex.com"
	, "spreadsheets.google.com"
	, "statmodeling.stat.columbia.edu"
	, "stats.grok.se"
	, "text.npr.org"
	, "thefirstaibook.com"
	, "thisanimedoesnotexist.ai"
	, "thiscatdoesnotexist.com"
	, "thisrentaldoesnotexist.com"
	, "training.kalzumeus.com"
	, "unsongbook.com"
	, "upload.wikimedia.org"
	, "vast.ai"
	, "videolectures.net"
	, "wayback.archive-it.org"
	, "web.archive.org"
	, "wiki.evageeks.org"
	, "wiki.haskell.org"
	, "www.aleph.se"
	, "www.antipope.org"
	, "www.archive-it.org"
	, "www.barnesandnoble.com"
	, "www.buzzricksons.jp"
	, "www.cdc.gov"
	, "www.cogmed.com"
	, "www.cogtest.com"
	, "www.cram.com"
	, "www.cryonicscalculator.com"
	, "www.cylab.cmu.edu"
	, "www.dafont.com"
	, "www.davidsongifted.org"
	, "www.deeplearningbook.org"
	, "www.discoverbooks.com"
	, "www.doc88.com"
	, "www.drmaciver.com"
	, "www.e-codices.unifr.ch"
	, "www.ecologyandsociety.org"
	, "www.econlib.org"
	, "www.economist.com"
	, "www.econtalk.org"
	, "www.equator-network.org"
	, "www.equestriadaily.com"
	, "www.evamonkey.com"
	, "www.filfre.net"
	, "www.find-more-books.com"
	, "www.frontiersin.org"
	, "www.genetics.org"
	, "www.gizmodo.com.au"
	, "www.gnxp.com"
	, "www.google-melange.com"
	, "www.greaterwrong.com"
	, "www.gutenberg.org"
	, "www.haskell.org"
	, "www.hpmor.com"
	, "www.html-tidy.org"
	, "www.iarpa.gov"
	, "www.iqtest.com"
	, "www.joelonsoftware.com"
	, "www.johndcook.com"
	, "www.kalzumeus.com"
	, "www.lesswrong.com"
	, "www.librarything.com"
	, "www.mail-archive.com"
	, "www.mediawiki.org"
	, "www.metafor-project.org"
	, "www.motherjones.com"
	, "www.ncbi.nlm.nih.gov"
	, "www.npr.org"
	, "www.ohyouprettythings.com"
	, "www.overcomingbias.com"
	, "www.poetryfoundation.org"
	, "www.proquest.com"
	, "www.psychiatryinvestigation.org"
	, "www.r-bloggers.com"
	, "www.rdocumentation.org"
	, "www.ribbonfarm.com"
	, "www.rifters.com"
	, "www.sapa-project.org"
	, "www.schneier.com"
	, "www.sciencedirect.com"
	, "www.sciencenews.org"
	, "www.sciencenewsline.com"
	, "www.shawwn.com"
	, "www.simplify.so"
	, "www.snpedia.com"
	, "www.stat.columbia.edu"
	, "www.stat.columbia.edu"
	, "www.straighttalkonevidence.org"
	, "www.tarsnap.com"
	, "www.theatlantic.com"
	, "www.theindiaforum.in"
	, "www.theparisreview.org"
	, "www.thisfursonadoesnotexist.com"
	, "www.thispersondoesnotexist.com"
	, "www.thiswaifudoesnotexist.net"
	, "www.thisworddoesnotexist.com"
	, "www.thriftbooks.com"
	, "www.urbandictionary.com"
	, "www.vanityfair.com"
	, "www.vocativ.com"
	, "www.w3.org"
	, "www.washingtonpost.com"
	, "www.whichfaceisreal.com"
	, "www.winehq.org"
	, "www.wolfewiki.com"
	, "www.wsj.com"
	, "www.yalelawjournal.org"
	, "www.youtube.com"
	, "xkcd.com"
	, "xtools.wmflabs.org"
	, "mail.haskell.org"
	, "hackage.haskell.org"
	, "online.wsj.com"
	, "www.microsoft.com"
	, "intelligence.org"
	, "eprint.iacr.org"
	, "www.explainxkcd.com"
	, "www.silverhandmeadery.com"
	, "www.nickbostrom.com"
	, "well.blogs.nytimes.com"
	, "www.gwern.net"
	, "rjlipton.wordpress.com"
	, "jaspervdj.be"
	, "jama.jamanetwork.com"
	, "blog.codinghorror.com"
	, "aiimpacts.org"
	, "web.archive.org"
	, "www.fhi.ox.ac.uk"
	, "www.cjas.org"
	, "blog.google"
	, "archinte.jamanetwork.com"
	, "aclanthology.org"
	, "www.clinicaltrials.gov"
	, "proceedings.mlr.press"
	, "diff.wikimedia.org"
	, "www.scottaaronson.com"
	, "www.eugenewei.com"
	, "www.alignmentforum.org"
	, "www.wired.com"
	, "www.evaotaku.com"
	, "www.stuff.co.nz"
	, "texample.net"
	, "www.dailymail.co.uk"
	, "www.memteaimports.com"
	, "boards.fireden.net"
	, "webcitation.org"
	, "www.reuters.com"
	, "mail.haskell.org"
	, "gameprogrammingpatterns.com"
	, "digital.library.unt.edu"
	, "www.salon.com"
	, "www.metopera.org"
	, "dnstats.net"
	, "www.thecut.com"
	, "animekritik.wordpress.com"
	, "www.fadedpage.com"
	, "www.dailydot.com"
	, "www.candyjapan.com"
	, "nautil.us"
	, "emilkirkegaard.dk"
	, "www.independent.co.uk"
	, "www.edwardtufte.com"
	, "www.brookings.edu"
	, "www.blockchain.com"
	, "web.stanford.edu"
	, "mitpress.mit.edu"
	, "freakonomics.com"
	, "forums.animesuki.com"
	, "eli.thegreenplace.net"
	, "www.theregister.com"
	, "www.alcor.org"
	, "the-liliquarium.livejournal.com"
	, "socghop.appspot.com"
	, "people.csail.mit.edu"
	, "findarticles.com"
	, "dataprivacylab.org"
	, "blog.23andme.com"
	, "andrewmayneblog.wordpress.com"
	, "www.thefreelibrary.com"
	, "www.sfgate.com"
	, "www.rrauction.com"
	, "www.merkle.com"
	, "www.links.org"
	, "www.bartleby.com"
	, "wavemotioncannon.com"
	, "www.baltimoresun.com"
	, "unenumerated.blogspot.com"
	, "scottaaronson.blog"
	, "rjlipton.wordpress.com"
	, "mason.gmu.edu"
	, "ilovetypography.com"
	, "humanvarieties.org"
	, "googlesystem.blogspot.com"
	, "www.yudkowsky.net"
	, "arr.am"
	, "www.worldcat.org"
	, "www.supermemo.com"
	, "www.standard.co.uk"
	, "www.orlandosentinel.com"
	, "www.nbcnews.com"
	, "www.mercurynews.com"
	, "www.math.uwaterloo.ca"
	, "www.jefftk.com"
	, "www.gq.com"
	, "www.businessweek.com"
	, "www.austlii.edu.au"
	, "www.aiweirdness.com"
	, "w.atwiki.jp"
	, "vitalik.ca"
	, "unqualified-reservations.blogspot.com"
	, "thegrandnarrative.com"
	, "sre.google"
	, "signalvnoise.com"
	, "shkspr.mobi"
	, "qualiacomputing.com"
	, "penelope.uchicago.edu"
	, "parahumans.wordpress.com"
	, "palladiummag.com"
	, "packdeps.haskellers.com"
	, "ohtori.nu"
	, "my.vanderbilt.edu"
	, "mathworld.wolfram.com"
	, "magenta.tensorflow.org"
	, "infoproc.blogspot.com"
	, "highnoongmt.wordpress.com"
	, "googleprojectzero.blogspot.com"
	, "forum.quantifiedself.com"
	, "foreignpolicy.com"
	, "engineering.fb.com"
	, "cdn.openai.com"
	, "cdn.discordapp.com"
	, "blog.acolyer.org"
	, "web.archive.org"
	, "articles.latimes.com"
	, "alumni.media.mit.edu"
	, "agtb.wordpress.com"
	, "zlkj.in"
	, "www.wakapoetry.net"
	, "www.vetta.org"
	, "www.unz.com"
	, "www.unicode.org"
	, "www.unc.edu"
	, "www.tor.com"
	, "www.tomodachi.de"
	, "www.thestranger.com"
	, "www.the-scientist.com"
	, "www.tabletmag.com"
	, "www.syracuse.com"
	, "www.sun-modalert.com"
	, "www.spiegel.de"
	, "www.sankakucomplex.com"
	, "www.sacbee.com"
	, "www.rwagner.net"
	, "www.richardcarrier.info"
	, "www.rationaloptimist.com"
	, "www.pragmatic.ml"
	, "www.popsci.com"
	, "www.owenstephens.co.uk"
	, "www.nydailynews.com"
	, "www.oregonlive.com"
	, "www.miamiherald.com"
	, "www.lrb.co.uk"
	, "www.livestrong.com"
	, "www.karger.com"
	, "www.japansociety.org"
	, "www.japaninc.com"
	, "www.grandforksherald.com"
	, "www.genealogy.math.ndsu.nodak.edu"
	, "www.gawker.com"
	, "www.fathomevents.com"
	, "www.dartmouth.edu"
	, "www.culhwch.info"
	, "www.cs.virginia.edu"
	, "www.cnn.com"
	, "www.chicagotribune.com"
	, "www.cbsnews.com"
	, "www.bemmu.com"
	, "www.4nrx-uk.md"
	, "warontherocks.com"
	, "venturebeat.com"
	, "time.com"
	, "threadreaderapp.com"
	, "thelastpsychiatrist.com"
	, "taooftea.com"
	, "takimag.com"
	, "synapse.koreamed.org"
	, "stratechery.com"
	, "srconstantin.wordpress.com"
	, "spikejapan.wordpress.com"
	, "soranews24.com"
	, "senrigan.io"
	, "retractionwatch.com"
	, "replicationindex.com"
	, "queue.acm.org"
	, "phys.org"
	, "originstamp.com"
	, "opinionator.blogs.nytimes.com"
	, "okmij.org"
	, "web.archive.org"
	, "web.archive.org"
	, "newcriterion.com"
	, "neurosciencenews.com"
	, "my.pgp-hms.org"
	, "meteuphoric.com"
	, "meehl.umn.edu"
	, "mathshistory.st-andrews.ac.uk"
	, "longtermrisk.org"
	, "jtauber.com"
	, "journal.stuffwithstuff.com"
	, "ideas.repec.org"
	, "harpers.org"
	, "hapgood.us"
	, "googleblog.blogspot.com"
	, "globalguerrillas.typepad.com"
	, "felinegenetics.missouri.edu"
	, "eva-fan.com"
	, "esolangs.org"
	, "eileenormsby.com"
	, "diyhpl.us"
	, "egamebook.com"
	, "donsbot.com"
	, "cs.stanford.edu"
	, "crookedtimber.org"
	, "care.diabetesjournals.org"
	, "caniuse.com"
	, "bldgblog.com"
	, "betabeat.com"
	, "www.chinadaily.com.cn"
	, "googlesystem.blogspot.com"
	, "paulfchristiano.com"
	, "people.csail.mit.edu"
	, "quantifiedself.com"
	, "socghop.appspot.com"
	, "unenumerated.blogspot.com"
	, "web.archive.org"
	, "www.aging-us.com"
	, "www.belfasttelegraph.co.uk"
	, "www.benkuhn.net"
	, "www.bostonglobe.com"
	, "www.brainpreservation.org"
	, "www.bu.edu"
	, "www.c82.net"
	, "www.catalogtree.net"
	, "www.cia.gov"
	, "www.dailymail.co.uk"
	, "www.ft.com"
	, "www.mangaupdates.com"
	, "www.mentalfloss.com"
	, "www.sacbee.com"
	, "www.sankakucomplex.com"
	, "dresdencodak.com"
	, "downloads.haskell.org"
	, "ageofem.com"
	, "ai.google"
	, "aleph.se"
	, "altjapan.typepad.com"
	, "ansuz.sooke.bc.ca"
	, "apnews.com"
	, "arima.cylab.cmu.edu"
	, "bair.berkeley.edu"
	, "behavioralscientist.org"
	, "believermag.com"
	, "bitcoin-otc.com"
	, "bits.blogs.nytimes.com"
	, "blog.8faces.com"
	, "blog.cr.yp.to"
	, "blog.csdn.net"
	, "blog.ethereum.org"
	, "blog.nuclearsecrecy.com"
	, "blog.youtube"
	, "blogs.wsj.com"
	, "cacm.acm.org"
	, "carbonplan.org"
	, "casual-effects.com"
	, "cognitivemedium.com"
	, "commons.wikimedia.org"
	, "courses.csail.mit.edu"
	, "daniellakens.blogspot.com"
	, "data.bls.gov"
	, "datacolada.org"
	, "dealbook.nytimes.com"
	, "dialnet.unirioja.es"
	, "dominiccummings.com"
	, "dumps.wikimedia.org"
	, "energycontrol.org"
	, "exac.broadinstitute.org"
	, "familiarcycle.net"
	, "fras.uk"
	, "galois.com"
	, "gamefaqs.gamespot.com"
	, "github.blog"
	, "globalvoices.org"
	, "google-summer-of-code-2009-haskell.googlecode.com"
	, "gradientscience.org"
	, "gutenberg.net.au"
	, "handbook-5-1.cochrane.org"
	, "healthland.time.com"
	, "hub.darcs.net"
	, "iforcedabot.com"
	, "inhumanexperiment.blogspot.com"
	, "isomerdesign.com"
	, "jessegalef.com"
	, "justgetflux.com"
	, "komonews.com"
	, "krebsonsecurity.com"
	, "langsec.org"
	, "latimesblogs.latimes.com"
	, "lettersofnote.com"
	, "lifescivc.com"
	, "lithub.com"
	, "lucumr.pocoo.org"
	, "mako.cc"
	, "neojaponisme.com"
	, "nbc-2.com"
	, "mlg.eng.cam.ac.uk"
	, "minimaxir.com"
	, "milan.cvitkovic.net"
	, "medicalxpress.com"
	, "www.collectorsweekly.com"
	, "www.cato-unbound.org"
	, "www.alexirpan.com"
	, "www.alessonislearned.com"
	, "www.adelaidenow.com.au"
	, "www.abcb.com"
	, "writings.stephenwolfram.com"
	, "writeswith.com"
	, "wikimediafoundation.org"
	, "washingtonmonthly.com"
	, "trixter.oldskool.org"
	, "tools.wmflabs.org"
	, "tomcritchlow.com"
	, "thehardestscience.com"
	, "strategy.wikimedia.org"
	, "spp.fas.org"
	, "sociologicalscience.com"
	, "socialsciences.mcmaster.ca"
	, "sf-encyclopedia.com"
	, "search.wikileaks.org"
	, "schoolgirlmilkycrisis.com"
	, "scarybeastsecurity.blogspot.com"
	, "reflectivedisequilibrium.blogspot.com"
	, "readwrite.com"
	, "quillette.com"
	, "psychonautwiki.org"
	, "psych.hanover.edu"
	, "programme.exordo.com"
	, "politicalcalculations.blogspot.com"
	, "pharmacyreviewer.co"
	, "petertodd.org"
	, "pediatrics.aappublications.org"
	, "pages.jh.edu"
	, "orionmagazine.org"
	, "nyaa.si"
	, "nootropicsdepot.com"
	, "ngm.nationalgeographic.com"
	, "thebaffler.com"
	, "svilentodorov.xyz"
	, "www.computerworld.com"
	, "vinoshipper.com"
	, "www.mcall.com"
	, "www.latimes.com"
	, "www.koreatimes.co.kr"
	, "www.kooslooijesteijn.net"
	, "www.khara.co.jp"
	, "www.justinpinkney.com"
	, "www.johnsonessays.com"
	, "www.inkandswitch.com"
	, "www.independent.ie"
	, "www.incompleteideas.net"
	, "www.hsx.com"
	, "www.heraldsun.com.au"
	, "www.harrowell.org.uk"
	, "www.globalsecurity.org"
	, "www.ghibli.jp"
	, "www.galbithink.org"
	, "www.fast.ai"
	, "www.evacommentary.org"
	, "www.discoverteas.com"
	, "www.depauw.edu"
	, "www.deseret.com"
	, "www.davidbrin.com"
	, "www.davidbordwell.net"
	, "www.dagbladet.no"
	, "www.daemonology.net"
	, "www.cs.odu.edu"
	, "www.cs.dartmouth.edu"
	, "www.couriermail.com.au"
	, "www.hbs.edu"
	, "www.infranken.de"
	, "www.pelleas.net"
	, "www.pewresearch.org"
	, "www.pcmag.com"
	, "www.oricon.co.jp"
	, "www.nyaa.eu"
	, "www.nps.gov"
	, "www.nplusonemag.com"
	, "www.noisebridge.net"
	, "www.nextplatform.com"
	, "www.nextbigfuture.com"
	, "www.newstatesman.com"
	, "www.newsday.com"
	, "www.metzdowd.com"
	, "www.zeit.de"
	, "www.webmd.com"
	, "www.usnews.com"
	, "www.uk-anime.net"
	, "www.tranquiltuesdays.com"
	, "www.thesmokinggun.com"
	, "www.scienceagogo.com"
	, "www.scielo.br"
	, "www.rxshop.md"
	, "www.righto.com"
	, "www.project-imas.com"
	, "www.wired.co.uk"
	, "www.talyarkoni.org"
	, "www.statnews.com"
	, "www.sleep-journal.com"
	, "www.slate.com"
	, "www.sjsu.edu"
	, "www.sirlin.net"
	, "www.shawlocal.com"
	, "www.sciencemadness.org"
	, "abcnews.go.com"
	, "www.washingtontimes.com"
	, "abcnotation.com"
	, "www.princeton.edu"
	, "r6.ca"
	, "www.technologyreview.com"
	, "www.ncbi.nlm.nih.gov"
	, "retractionwatch.com"
	, "www.dartmouth.edu"
	, "www.cnn.com"
	, "www.yf.io"
	, "www.wtnh.com"
	, "www.writingroutines.com"
	, "www.wheels.org"
	, "www.vesta.earth"
	, "www.uliwestphal.de"
	, "www.ubu.com"
	, "www.tt-forums.net"
	, "www.trubrain.com"
	, "www.trentonbricken.com"
	, "www.tomshardware.com"
	, "www.themtank.org"
	, "www.thedenverchannel.com"
	, "www.systutorials.com"
	, "www.sumsar.net"
	, "www.stripes.com"
	, "www.ssc.wisc.edu"
	, "www.sqlite.org"
	, "www.spring.org.uk"
	, "www.spiked-online.com"
	, "www.siliconera.com"
	, "www.rosebud.ai"
	, "www.reg.ru"
	, "www.punchlinedesign.net"
	, "www.prolific.co"
	, "www.politico.com"
	, "www.orbuch.com"
	, "www.nationalgeographic.com"
	, "www.microdose.me"
	, "www.lifeview.com"
	, "www.lehighvalleylive.com"
	, "www.ledger-cli.org"
	, "www.jdmoyer.com"
	, "www.jamesfadiman.com"
	, "www.itmedia.co.jp"
	, "www.intechopen.com"
	, "www.freakonomicsexperiments.com"
	, "www.eduref.net"
	, "www.coderelay.io"
	, "www.cleveland.com"
	, "www.chrisstucchio.com"
	, "www.chrisplaysgames.com"
	, "www.broadinstitute.org"
	, "www.becker-posner-blog.com"
	, "www.artnome.com"
	, "www.andzuck.com"
	, "www.allencheng.com"
	, "www.alicemaz.com"
	, "www.adamsmith.org"
	, "www.aboutamazon.com"
	, "www-cs-faculty.stanford.edu"
	, "wiki.lesswrong.com"
	, "whyevolutionistrue.com"
	, "web.media.mit.edu"
	, "vfxblog.com"
	, "vdfresearch.org"
	, "vastabrupt.com"
	, "vasilishynkarenka.com"
	, "tug.org"
	, "tosche.net"
	, "thoughtcrime.crummy.com"
	, "thiseyedoesnotexist.com"
	, "thenewstatistics.com"
	, "thebrowser.com"
	, "the-toast.net"
	, "teageegeepea.tripod.com"
	, "stevenson.lab.uconn.edu"
	, "stephenmalina.com"
	, "status451.com"
	, "stackroboflow.com"
	, "slimemoldtimemold.com"
	, "seths.blog"
	, "scientistatwork.blogs.nytimes.com"
	, "sciencebulletin.org"
	, "science.ksc.nasa.gov"
	, "samoburja.com"
	, "ruder.io"
	, "read-the-samples.netlify.app"
	, "quadrant.org.au"
	, "pytorch.org"
	, "pudding.cool"
	, "projects.tampabay.com"
	, "projects.jsonline.com"
	, "poets.org"
	, "poemanalysis.com"
	, "personal.math.ubc.ca"
	, "people.idsia.ch"
	, "people.com"
	, "oscarbonilla.com"
	, "orwell.ru"
	, "opensource.adobe.com"
	, "ooo.ghostbows.ooo"
	, "news.nationalgeographic.com"
	, "mssv.net"
	, "mosaicscience.com"
	, "ml.berkeley.edu"
	, "mkv25.net"
	, "mathbabe.org"
	, "mailchi.mp"
	, "magazine.atavist.com"
	, "longitudinal.blog"
	, "littlebiggy.org"
	, "lavaan.ugent.be"
	, "larryniven.net"
	, "laion.ai"
	, "kojimars.at.webry.info"
	, "kevinlynagh.com"
	, "kev.town"
	, "kajsotala.fi"
	, "journals.biologists.com"
	, "beza1e1.tuxen.de"
	, "web.archive.org"
	, "www.pcworld.com"
	, "www.unqualified-reservations.org"
	, "evaotaku.com"
	, "forre.st"
	, "mikepower.pressfolios.com"
	, "www.coyneoftherealm.com"
	, "wiki.openttdcoop.org"
	, "quinndunki.com"
	, "learning.mpi-sws.org"
	, "jov.arvojournals.org"
	, "jakewestfall.org"
	, "e2eml.school"
	, "defector.com"
	, "davidepstein.com"
	, "corpgov.law.harvard.edu"
	, "copilot.github.com"
	, "constancecrozier.com"
	, "complearn.org"
	, "compdemocracy.org"
	, "catonmat.net"
	, "calhoun.nps.edu"
	, "bwc.thelab.dc.gov"
	, "blog.thinkst.com"
	, "blog.regehr.org"
	, "blog.cryptographyengineering.com"
	, "b-ok.cc"
	, "archive.seattletimes.com"
	, "architext.design"
	, "andymatuschak.org"
	, "alexanderetz.com"
	, "advertising-effects.chicagobooth.edu"
	, "about.google"
	, "6thfloor.blogs.nytimes.com"
	, "www2.biology.ualberta.ca"
	, "www.wesjones.com"
	, "www.urbandharma.org"
	, "www.tlmc.eu"
	, "www.rfreitas.com"
	, "www.moserware.com"
	, "ew.com"
	, "examples.yourdictionary.com"
	, "fs.blog"
	, "freedomdefined.org"
	, "fibery.io"
	, "fastmoe.ai"
	, "joshmitteldorf.scienceblog.com"
	, "jonmillward.com"
	, "johncwright.livejournal.com"
	, "joa.sh"
	, "jgeekstudies.org"
	, "jdlm.info"
	, "jaypsong.blog"
	, "jax.readthedocs.io"
	, "jamesyu.org"
	, "image-net.org"
	, "ifdo.ca"
	, "historycooperative.org"
	, "herbsutter.com"
	, "hdsr.mitpress.mit.edu"
	, "hakaimagazine.com"
	, "gutenberg.ca"
	, "gpt3demo.com"
	, "gondwanaland.com"
	, "gaotianyu.xyz"
	, "futurism.com"
	, "extras.denverpost.com"
	, "eurekamag.com"
	, "eukaryotewritesblog.com"
	, "etienne.se"
	, "endlessvn.io"
	, "statmodeling.stat.columbia.edu"
	, "archive.nytimes.com"
	, "www.michaellight.net"
	, "www.otakustudy.com"
	, "www.baka-tsuki.org"
	, "story.californiasunday.com"
	, "thispersondoesnotexist.com"
	, "metropolitician.blogs.com"
	, "pauillac.inria.fr"
	, "asktog.com"
	, "www.unf.edu",
]

const allowSubdomainsFromGwern = [
	'.allennlp.org',
	'.archive.org',
	'.archiveteam.org',
	'.bandcamp.com',
	'.eleuther.ai',
	'.fandom.com',
	'.github.io',
	'.givewell.org',
	'.greenspun.com',
	'.humanprogress.org',
	'.imagemagick.org',
	'.mementoweb.org',
	'.metafilter.com',
	'.nomeata.de',
	'.obormot.net',
	'.tumblr.com',
	'.xkcd.com',
	'.wikipedia.org',
	'.wordpress.com',
	'.blogspot.com',
]

export const allowSubdomainsFrom = [
	'.wikidata.org',
	'.roam.garden',
	...allowSubdomainsFromGwern,
]

export const whitelistDomains = [
	"manifold.markets",
	...goodGwernDomains,
]
