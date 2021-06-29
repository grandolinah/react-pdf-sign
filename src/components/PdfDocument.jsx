import React, { useRef } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const PdfDocument = ({name, privateNumber, job, days, startDate, option, signature}) => {
  const year = new Date().getFullYear();
  const pdfRef = useRef(null);

  return (
      <Document ref={pdfRef}>
        <Page size="A4" style={styles.body}>
          <View style={styles.container}>
            <Text style={styles.text}>До</Text>
            <Text style={styles.text}>Управителя</Text>
            <Text style={styles.text}>на РЪББЪР ДЪК ООД</Text>
          </View>
          <View style={styles.main}>
            <View style={styles.titleContainer}>
              <Text style={{ ...styles.text, ...styles.title }}>ЗАЯВЛЕНИЕ</Text>
            </View>
            <View style={styles.personalInfo}>
              <Text style={styles.text}>От {name === '' ? '..........................................' : name} ЕГН {privateNumber === '' ? '..................' : privateNumber} на длъжност: {job === '' ? '..........................................' : job}</Text>
            </View>
            <View style={styles.application}>
              <Text style={styles.text}>Г-н Управител,</Text>
              <Text style={styles.text}> Моля да ми разрешите да ползването на {option === 'paid' ? 'платен' : 'неплатен'} отпуск по чл.155, ал.4 от КТ за {year} година, в продължение на {days} работни дни, считано от {startDate} год.</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
            <Text style={styles.text}>Дата: {(new Date()).toLocaleDateString('en-GB').split('/').join('.')}г.</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', height: 60 }}>
              <Text style={styles.text}>Подпис: {!signature ? '.............' : ' '}</Text>
              {signature && <Image style={{ width: 80, height: 80 }} src={signature} />}
            </View>
          </View>
        </Page>
      </Document>
  )
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    fontWeight: 400,
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  title: {
    marginVertical: 60,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 600,
  },
  personalInfo: {
    marginVertical: 30,
    fontWeight: 600,
  },
  application: {
    marginVertical: 90,
  }
});

export default PdfDocument;