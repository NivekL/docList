import PersonCard from '@/components/PersonCard';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

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
  const [filteredData, setFilteredData] = useState<PsychologistProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const searchForPsychologist = () => {
    if (searchTerm === '') {
      setFilteredData(psychologistData);
    } else {
      const filtered = psychologistData.filter(
        (person) =>
          person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.headline.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    getAllPsychologists();
  }, []);

  useEffect(() => {
    searchForPsychologist();
  }, [searchTerm, psychologistData]);

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

        <TextInput
          placeholder="Sök på namn eller titel"
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholderTextColor={'gray'}
          style={{
            marginTop: 15,
            borderWidth: 1,
            borderColor: '#131313',
            padding: 10,
          }}
        />

        <Text style={{ fontSize: 16, marginTop: 15 }}>
          Resultat: {filteredData.length}
        </Text>
        <View>
          {psychologistData.length === 0 || filteredData.length === 0 ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <Text style={{ fontSize: 23, color: '#000' }}>
                Hittade inga tillgängliga psykologer
              </Text>
            </View>
          ) : (
            filteredData.map((members: PsychologistProps) => {
              return (
                <PersonCard
                  key={members.psychologistId}
                  firstName={members.firstName}
                  lastName={members.lastName}
                  headline={members.headline}
                  thumbnail={members.thumbnail}
                />
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
