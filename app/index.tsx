import PersonCard from '@/components/PersonCard';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

interface PsychologistProps {
  psychologistId: number;
  firstName: string;
  lastName: string;
  thumbnail: string;
  headline: string;
  headlineEnum: string;
  startsAt: number;
  matchingSlots: number;
  userId: number;
}

export default function Index() {
  const [psychologistData, setPsychologistData] = useState<PsychologistProps[]>(
    []
  );

  const getAllPsychologists = async () => {
    try {
      const response = await fetch(
        'https://mindler.se/api/mindlerproxy/psychologists/available/'
      );
      const resData = await response.json();
      setPsychologistData(resData.data);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    getAllPsychologists();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: 80,
        marginBottom: 20,
        marginHorizontal: 12,
      }}
    >
      <ScrollView>
        <Text style={{ fontSize: 23 }}>Våra tillgängliga psykologer</Text>

        <Text style={{ fontSize: 16, marginTop: 15 }}>
          Resultat: {psychologistData.length}
        </Text>
        <View>
          {psychologistData &&
            psychologistData.map((members: PsychologistProps) => {
              return (
                <PersonCard
                  key={members.psychologistId}
                  firstName={members.firstName}
                  lastName={members.lastName}
                  headline={members.headline}
                  thumbnail={members.thumbnail}
                />
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
