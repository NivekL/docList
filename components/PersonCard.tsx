import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

interface PsychologistCardProps {
  firstName: string;
  lastName: string;
  thumbnail: string;
  headline: string;
}

export default function PersonCard({
  firstName,
  lastName,
  thumbnail,
  headline,
}: PsychologistCardProps) {
  return (
    <View>
      <View style={styles.Card}>
        <Image
          width={150}
          height={150}
          source={{ uri: thumbnail }}
          alt={`${firstName} ${lastName}`}
        />
        <View style={{ padding: 10, maxWidth: 170 }}>
          <Text style={{ fontWeight: '500', fontSize: 16 }}>
            {firstName} {lastName}
          </Text>
          <Text>{headline}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#131313',
  },
});
