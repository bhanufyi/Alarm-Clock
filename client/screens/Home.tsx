import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import AlarmClock from './Alarm';
import { Picker } from '@react-native-picker/picker';
import { styles, textStyles } from '../styles/index';
import { useDarkMode } from '../contexts/DarkModeContext';

const timeZones = [
  'Africa/Abidjan',
  'Africa/Accra',
  'Africa/Addis_Ababa',
  'Africa/Algiers',
  'Africa/Asmera',
  'Africa/Bamako',
  'Africa/Bangui',
  'Africa/Banjul',
  'Africa/Bissau',
  'Africa/Blantyre',
  'Africa/Brazzaville',
  'Africa/Bujumbura',
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Ceuta',
  'Africa/Conakry',
  'Africa/Dakar',
  'Africa/Dar_es_Salaam',
  'Africa/Djibouti',
  'Africa/Douala',
  'Africa/El_Aaiun',
  'Africa/Freetown',
  'Africa/Gaborone',
  'Africa/Harare',
  'Africa/Johannesburg',
  'Africa/Juba',
  'Africa/Kampala',
  'Africa/Khartoum',
  'Africa/Kigali',
  'Africa/Kinshasa',
  'Africa/Lagos',
  'Africa/Libreville',
  'Africa/Lome',
  'Africa/Luanda',
  'Africa/Lubumbashi',
  'Africa/Lusaka',
  'Africa/Malabo',
  'Africa/Maputo',
  'Africa/Maseru',
  'Africa/Mbabane',
  'Africa/Mogadishu',
  'Africa/Monrovia',
  'Africa/Nairobi',
  'Africa/Ndjamena',
  'Africa/Niamey',
  'Africa/Nouakchott',
  'Africa/Ouagadougou',
  'Africa/Porto-Novo',
  'Africa/Sao_Tome',
  'Africa/Tripoli',
  'Africa/Tunis',
  'Africa/Windhoek',
  'America/Adak',
  'America/Anchorage',
  'America/Anguilla',
  'America/Antigua',
  'America/Araguaina',
  'America/Argentina/La_Rioja',
  'America/Argentina/Rio_Gallegos',
  'America/Argentina/Salta',
  'America/Argentina/San_Juan',
  'America/Argentina/San_Luis',
  'America/Argentina/Tucuman',
  'America/Argentina/Ushuaia',
  'America/Aruba',
  'America/Asuncion',
  'America/Bahia',
  'America/Bahia_Banderas',
  'America/Barbados',
  'America/Belem',
  'America/Belize',
  'America/Blanc-Sablon',
  'America/Boa_Vista',
  'America/Bogota',
  'America/Boise',
  'America/Buenos_Aires',
  'America/Cambridge_Bay',
  'America/Campo_Grande',
  'America/Cancun',
  'America/Caracas',
  'America/Catamarca',
  'America/Cayenne',
  'America/Cayman',
  'America/Chicago',
  'America/Chihuahua',
  'America/Ciudad_Juarez',
  'America/Coral_Harbour',
  'America/Cordoba',
  'America/Costa_Rica',
  'America/Creston',
  'America/Cuiaba',
  'America/Curacao',
  'America/Danmarkshavn',
  'America/Dawson',
  'America/Dawson_Creek',
  'America/Denver',
  'America/Detroit',
  'America/Dominica',
  'America/Edmonton',
  'America/Eirunepe',
  'America/El_Salvador',
  'America/Fort_Nelson',
  'America/Fortaleza',
  'America/Glace_Bay',
  'America/Godthab',
  'America/Goose_Bay',
  'America/Grand_Turk',
  'America/Grenada',
  'America/Guadeloupe',
  'America/Guatemala',
  'America/Guayaquil',
  'America/Guyana',
  'America/Halifax',
  'America/Havana',
  'America/Hermosillo',
  'America/Indiana/Knox',
  'America/Indiana/Marengo',
  'America/Indiana/Petersburg',
  'America/Indiana/Tell_City',
  'America/Indiana/Vevay',
  'America/Indiana/Vincennes',
  'America/Indiana/Winamac',
  'America/Indianapolis',
  'America/Inuvik',
  'America/Iqaluit',
  'America/Jamaica',
  'America/Jujuy',
  'America/Juneau',
  'America/Kentucky/Monticello',
  'America/Kralendijk',
  'America/La_Paz',
  'America/Lima',
  'America/Los_Angeles',
  'America/Louisville',
  'America/Lower_Princes',
  'America/Maceio',
  'America/Managua',
  'America/Manaus',
  'America/Marigot',
  'America/Martinique',
  'America/Matamoros',
  'America/Mazatlan',
  'America/Mendoza',
  'America/Menominee',
  'America/Merida',
  'America/Metlakatla',
  'America/Mexico_City',
  'America/Miquelon',
  'America/Moncton',
  'America/Monterrey',
  'America/Montevideo',
  'America/Montserrat',
  'America/Nassau',
  'America/New_York',
  'America/Nome',
  'America/Noronha',
  'America/North_Dakota/Beulah',
  'America/North_Dakota/Center',
  'America/North_Dakota/New_Salem',
  'America/Ojinaga',
  'America/Panama',
  'America/Paramaribo',
  'America/Phoenix',
  'America/Port-au-Prince',
  'America/Port_of_Spain',
  'America/Porto_Velho',
  'America/Puerto_Rico',
  'America/Punta_Arenas',
  'America/Rankin_Inlet',
  'America/Recife',
  'America/Regina',
  'America/Resolute',
  'America/Rio_Branco',
  'America/Santarem',
  'America/Santiago',
  'America/Santo_Domingo',
  'America/Sao_Paulo',
  'America/Scoresbysund',
  'America/Sitka',
  'America/St_Barthelemy',
  'America/St_Johns',
  'America/St_Kitts',
  'America/St_Lucia',
  'America/St_Thomas',
  'America/St_Vincent',
  'America/Swift_Current',
  'America/Tegucigalpa',
  'America/Thule',
  'America/Tijuana',
  'America/Toronto',
  'America/Tortola',
  'America/Vancouver',
  'America/Whitehorse',
  'America/Winnipeg',
  'America/Yakutat',
  'Antarctica/Casey',
  'Antarctica/Davis',
  'Antarctica/DumontDUrville',
  'Antarctica/Macquarie',
  'Antarctica/Mawson',
  'Antarctica/McMurdo',
  'Antarctica/Palmer',
  'Antarctica/Rothera',
  'Antarctica/Syowa',
  'Antarctica/Troll',
  'Antarctica/Vostok',
  'Arctic/Longyearbyen',
  'Asia/Aden',
  'Asia/Almaty',
  'Asia/Amman',
  'Asia/Anadyr',
  'Asia/Aqtau',
  'Asia/Aqtobe',
  'Asia/Ashgabat',
  'Asia/Atyrau',
  'Asia/Baghdad',
  'Asia/Bahrain',
  'Asia/Baku',
  'Asia/Bangkok',
  'Asia/Barnaul',
  'Asia/Beirut',
  'Asia/Bishkek',
  'Asia/Brunei',
  'Asia/Calcutta',
  'Asia/Chita',
  'Asia/Choibalsan',
  'Asia/Colombo',
  'Asia/Damascus',
  'Asia/Dhaka',
  'Asia/Dili',
  'Asia/Dubai',
  'Asia/Dushanbe',
  'Asia/Famagusta',
  'Asia/Gaza',
  'Asia/Hebron',
  'Asia/Hong_Kong',
  'Asia/Hovd',
  'Asia/Irkutsk',
  'Asia/Jakarta',
  'Asia/Jayapura',
  'Asia/Jerusalem',
  'Asia/Kabul',
  'Asia/Kamchatka',
  'Asia/Karachi',
  'Asia/Katmandu',
  'Asia/Khandyga',
  'Asia/Krasnoyarsk',
  'Asia/Kuala_Lumpur',
  'Asia/Kuching',
  'Asia/Kuwait',
  'Asia/Macau',
  'Asia/Magadan',
  'Asia/Makassar',
  'Asia/Manila',
  'Asia/Muscat',
  'Asia/Nicosia',
  'Asia/Novokuznetsk',
  'Asia/Novosibirsk',
  'Asia/Omsk',
  'Asia/Oral',
  'Asia/Phnom_Penh',
  'Asia/Pontianak',
  'Asia/Pyongyang',
  'Asia/Qatar',
  'Asia/Qostanay',
  'Asia/Qyzylorda',
  'Asia/Rangoon',
  'Asia/Riyadh',
  'Asia/Saigon',
  'Asia/Sakhalin',
  'Asia/Samarkand',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Singapore',
  'Asia/Srednekolymsk',
  'Asia/Taipei',
  'Asia/Tashkent',
  'Asia/Tbilisi',
  'Asia/Tehran',
  'Asia/Thimphu',
  'Asia/Tokyo',
  'Asia/Tomsk',
  'Asia/Ulaanbaatar',
  'Asia/Urumqi',
  'Asia/Ust-Nera',
  'Asia/Vientiane',
  'Asia/Vladivostok',
  'Asia/Yakutsk',
  'Asia/Yekaterinburg',
  'Asia/Yerevan',
  'Atlantic/Azores',
  'Atlantic/Bermuda',
  'Atlantic/Canary',
  'Atlantic/Cape_Verde',
  'Atlantic/Faeroe',
  'Atlantic/Madeira',
  'Atlantic/Reykjavik',
  'Atlantic/South_Georgia',
  'Atlantic/St_Helena',
  'Atlantic/Stanley',
  'Australia/Adelaide',
  'Australia/Brisbane',
  'Australia/Broken_Hill',
  'Australia/Darwin',
  'Australia/Eucla',
  'Australia/Hobart',
  'Australia/Lindeman',
  'Australia/Lord_Howe',
  'Australia/Melbourne',
  'Australia/Perth',
  'Australia/Sydney',
  'Europe/Amsterdam',
  'Europe/Andorra',
  'Europe/Astrakhan',
  'Europe/Athens',
  'Europe/Belgrade',
  'Europe/Berlin',
  'Europe/Bratislava',
  'Europe/Brussels',
  'Europe/Bucharest',
  'Europe/Budapest',
  'Europe/Busingen',
  'Europe/Chisinau',
  'Europe/Copenhagen',
  'Europe/Dublin',
  'Europe/Gibraltar',
  'Europe/Guernsey',
  'Europe/Helsinki',
  'Europe/Isle_of_Man',
  'Europe/Istanbul',
  'Europe/Jersey',
  'Europe/Kaliningrad',
  'Europe/Kiev',
  'Europe/Kirov',
  'Europe/Lisbon',
  'Europe/Ljubljana',
  'Europe/London',
  'Europe/Luxembourg',
  'Europe/Madrid',
  'Europe/Malta',
  'Europe/Mariehamn',
  'Europe/Minsk',
  'Europe/Monaco',
  'Europe/Moscow',
  'Europe/Oslo',
  'Europe/Paris',
  'Europe/Podgorica',
  'Europe/Prague',
  'Europe/Riga',
  'Europe/Rome',
  'Europe/Samara',
  'Europe/San_Marino',
  'Europe/Sarajevo',
  'Europe/Saratov',
  'Europe/Simferopol',
  'Europe/Skopje',
  'Europe/Sofia',
  'Europe/Stockholm',
  'Europe/Tallinn',
  'Europe/Tirane',
  'Europe/Ulyanovsk',
  'Europe/Vaduz',
  'Europe/Vatican',
  'Europe/Vienna',
  'Europe/Vilnius',
  'Europe/Volgograd',
  'Europe/Warsaw',
  'Europe/Zagreb',
  'Europe/Zurich',
  'Indian/Antananarivo',
  'Indian/Chagos',
  'Indian/Christmas',
  'Indian/Cocos',
  'Indian/Comoro',
  'Indian/Kerguelen',
  'Indian/Mahe',
  'Indian/Maldives',
  'Indian/Mauritius',
  'Indian/Mayotte',
  'Indian/Reunion',
  'Pacific/Apia',
  'Pacific/Auckland',
  'Pacific/Bougainville',
  'Pacific/Chatham',
  'Pacific/Easter',
  'Pacific/Efate',
  'Pacific/Enderbury',
  'Pacific/Fakaofo',
  'Pacific/Fiji',
  'Pacific/Funafuti',
  'Pacific/Galapagos',
  'Pacific/Gambier',
  'Pacific/Guadalcanal',
  'Pacific/Guam',
  'Pacific/Honolulu',
  'Pacific/Kiritimati',
  'Pacific/Kosrae',
  'Pacific/Kwajalein',
  'Pacific/Majuro',
  'Pacific/Marquesas',
  'Pacific/Midway',
  'Pacific/Nauru',
  'Pacific/Niue',
  'Pacific/Norfolk',
  'Pacific/Noumea',
  'Pacific/Pago_Pago',
  'Pacific/Palau',
  'Pacific/Pitcairn',
  'Pacific/Ponape',
  'Pacific/Port_Moresby',
  'Pacific/Rarotonga',
  'Pacific/Saipan',
  'Pacific/Tahiti',
  'Pacific/Tarawa',
  'Pacific/Tongatapu',
  'Pacific/Truk',
  'Pacific/Wake',
  'Pacific/Wallis',
] as const;

// use Intl.supportedValuesOf('timeZone') when supported

type TimeZone = (typeof timeZones)[number];

export default function Home() {
  const { isDarkMode } = useDarkMode(); // Use the hook
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [screenClock, setScreenClock] = useState<TimeZone[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Define dynamic styles based on isDarkMode
  const dynamicStyles = {
    backgroundColor: isDarkMode ? 'darkgrey' : 'white',
    color: isDarkMode ? 'white' : 'black',
  };

  const addNewTimeZone = (zone: TimeZone) => {
    if (!screenClock.includes(zone)) {
      setScreenClock([...screenClock, zone]);
    }
  };

  const removeTimeZone = (index: number) => {
    setScreenClock((screenClock) => screenClock.filter((_, i) => i !== index));
  };

  const showTimeZonePicker = () => {
    setModalVisible(!modalVisible);
  };

  const formatDate = (date: Date, timeZone: TimeZone) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timeZone,
    }).format(date);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: dynamicStyles.backgroundColor }]}>
      <Text style={{ ...textStyles.titleText, padding: 20, color: dynamicStyles.color }}>
        World Clock
      </Text>

      <View style={{ height: 10 }} />
      {/* Managing picker for the time zones */}
      <View>
        <TouchableOpacity
          onPress={() => {
            showTimeZonePicker();
            if (modalVisible) {
              addNewTimeZone(selectedTimeZone as TimeZone); // Add the selected time zone
            }
          }}
          style={styles.button}
        >
          <Text style={textStyles.buttonText}>
            {modalVisible ? 'Confirm Clock' : 'Add New World Clock'}
          </Text>
        </TouchableOpacity>
        {modalVisible && (
          <Picker
            // style={styles.picker}: Unused style
            selectedValue={selectedTimeZone}
            onValueChange={(itemValue) => {
              setSelectedTimeZone(itemValue);
            }}
          >
            {timeZones.map((zone) => (
              <Picker.Item key={zone} label={zone} value={zone} />
            ))}
          </Picker>
        )}
      </View>
      {/* Displays different timezones */}
      <View>
        {screenClock.map((zone, index) => (
          <View
            key={index}
            style={[styles.time, { backgroundColor: dynamicStyles.backgroundColor }]}
          >
            <Text style={{ ...styles.buttonText, color: dynamicStyles.color }}>{zone}</Text>
            <TouchableOpacity onPress={() => removeTimeZone(index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <View style={[styles.box, { backgroundColor: dynamicStyles.backgroundColor }]}>
              <Text style={{ ...styles.time, color: dynamicStyles.color }}>
                {formatDate(currentTime, zone)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 200 }} />
    </ScrollView>
  );
}
