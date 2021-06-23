const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');
const { dbName, dbUrl } = require('../../constants');

const adminRouter = express.Router();
const posts = [
  {
    title: 'Computer are cool',
    description: 'Hindi-Content',
    content: `यदि आप इस साइट का नियमित रूप से इस्तेमाल करते हैं
     और इस साइट को इंटरनेट पर बनाये रखना चाहते हैं,
     तो एक छोटी राशि दान के रूप में देकर इसके होस्टिंग
     और बैंडविड्थ बिल के लिए भुगतान में मदद करने पर विचार करें.
     कोई न्यूनतम दान राशी नहीं है, कोई भी राशि की सराहनीय है`,
    creatorId: null,
  },
  {
    title: 'Blob',
    description: 'Arabic-Content',
    content: `والحزن ، بعض الأشياء المهمة
     التي يجب القيام بها. على مر السنين ، سآتي
      ، الذي سوف يخرج منها برأيك من ميزة
      التمرين ، بحيث تحفز الجهود بالمنطقة التعليمية وطول
      العمر. تريد أن تكون ألمًا في كيوبيداتات سيلوم تم
      انتقاده في فرار
      لا ينتج عنه أي متعة. باستثناء أن السود كيوبيدات ليسوا استثناءً ، فهو مهدئ للروح
      ، أي أنهم كدح لي ، لقد هجروا العام هو المسؤول عن أن الخدمات يجب أن !`,
    creatorId: null,
  },
  {
    title: 'Golabo',
    description: 'Telugu-Content',
    content: `లోరెం ఇప్సమ్ డోలర్ సిట్ అమేట్,
    కన్సెక్టూర్ అడిపిసింగ్ ఎలైట్, సెడ్ టెంపర్ మరియు తేజము,
    తద్వారా శ్రమ మరియు దు orrow ఖం, ఐయుస్మోడ్ చేయవలసిన కొన్ని ముఖ్యమైన విషయాలు.
    సంవత్సరాలుగా, నేను వస్తాను, ఎవరు వ్యాయామం యొక్క ప్రయోజనాన్ని ఆమె నుండి విడదీస్తారు,
    తద్వారా పాఠశాల జిల్లా మరియు దీర్ఘాయువు ఉంటే ఉద్దీపన ప్రయత్నాలు.
    మన్మథుడు సిల్లమ్‌లో నొప్పిగా ఉండాలనుకుంటున్నారా అని డ్యూయిస్ ఎట్ డోలోర్ మాగ్నా ఫ్లీలో విమర్శలు వచ్చాయి.
    మినహాయింపు మన్మథుడు నల్లజాతీయులు మినహాయింపు కాదు, ఆత్మకు ఓదార్పునిస్తారు,
    అనగా వారు నా శ్రమ, వారు విడిచిపెట్టారు జనరల్ అంటే సేవలు ఉండాలని నిందించడం`,
    creatorId: null,
  },
];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      (async function query() {
        let client;
        try {
          client = await MongoClient.connect(dbUrl);
          debug('Connected...');

          const db = client.db(dbName);

          const response = await db.collection('posts').insertMany(posts);
          res.json(response);
        } catch (error) {
          debug(error.stack);
        }
        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
