import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { 
  Container, SimpleGrid, Text, VStack, Box, Button, useColorMode, HStack, Icon, Divider, Badge, useColorModeValue 
} from "@chakra-ui/react";
import { FaUserTie, FaUsers, FaUserGraduate, FaUserCheck, FaUserTimes, FaChartPie } from "react-icons/fa";
import { Pie, Line } from "react-chartjs-2";
import "react-calendar/dist/Calendar.css";
import "chart.js/auto";


const labs = [
  {
    id: 1,
    name: "Lab 1",
    floor: "3rd Floor",
    incharge: "John Doe",
    batches: [
      { id: 1, name: "Batch A", time: "9:00 AM", course: "Full Stack", trainer: "Sarah Smith" },
      { id: 2, name: "Batch B", time: "2:00 PM", course: "Data Science", trainer: "Mike Johnson" },
    ]
  },
  {
    id: 2,
    name: "Lab 2",
    floor: "2nd Floor",
    incharge: "Jane Smith",
    batches: [
      { id: 3, name: "Batch C", time: "10:00 AM", course: "Digital Marketing", trainer: "Emily Davis" },
      { id: 4, name: "Batch D", time: "4:00 PM", course: "Cloud Computing", trainer: "Robert Brown" },
    ]
  },
  // Add more labs as needed
];


const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [time, setTime] = useState(new Date());

  const [selectedLab, setSelectedLab] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Add this handler function
  const handleBatchClick = (batchId) => {
    navigate(`/batch/${batchId}`);
  };
  
  const cardBg = useColorModeValue("white", "gray.700");
  const cardShadow = "lg";
  
  const pieData = {
    labels: ["Trainees", "Dropouts", "Ongoing Trainees", "Campus Placed", "Training Students"],
    datasets: [
      {
        data: [30, 5, 20, 10, 35],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const lineData = {
    labels: ["Web Designing", "Digital Marketing", "Human Resource", "Full Stack Development", "Data Analytics", "Python", "Java"],
    datasets: [
      {
        label: "Total Enrolled Trainees",
        data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const batches = [
    { id: 1, name: "Batch A", total: 40, present: 35, absent: 5 },
    { id: 2, name: "Batch B", total: 30, present: 25, absent: 5 },
    { id: 3, name: "Batch C", total: 50, present: 45, absent: 5 },
  ];






  return (
    <Container maxW="container.xl" py={4}>
      <VStack spacing={4}>
        <Text fontSize="30" fontWeight="bold" bgGradient="linear(to-r, cyan.400, blue.500)" bgClip="text" textAlign="center">
          ERP Dashboard 🚀
        </Text>

        <Button onClick={toggleColorMode} colorScheme="blue">
          Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
        </Button>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
          {[
            { icon: FaUserTie, title: "Total Employees", data: "Male: 50 | Female: 30", color: "blue.500" },
            { icon: FaUsers, title: "Trainees", data: "Male: 20 | Female: 15 | Foreigners: 5 | Indians: 30", color: "green.500" },
            { icon: FaUserGraduate, title: "Top Assigned Projects", data: "FalconShip | AllFixit | StartShip", color: "purple.500" }
          ].map(({ icon, title, data, color }, index) => (
            <Box key={index} p={6} borderWidth={0} borderRadius="" boxShadow={cardShadow} bg={cardBg}>
              <HStack spacing={4} align="center">
                <Icon as={icon} w={8} h={8} color={color} />
                <VStack align="start" spacing={1}>
                  <Text fontSize="lg" fontWeight="bold">{title}</Text>
                  <Text fontSize="sm">{data}</Text>
                </VStack>
              </HStack>
            </Box>
 
          ))}
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
  {/* Box1 - Should take space for two boxes (2 columns in md and lg screens) */}
  <Box
    p={6}
    borderWidth={0}
    borderRadius="0"
    boxShadow={cardShadow}
    bg={cardBg}
    w="full"
    gridColumn={{ base: "span 1", md: "span 2", lg: "span 2" }} // Occupies 2 columns on md and lg screens
  >
    <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
      Total Enrolled Trainees
    </Text>
    <Line data={lineData} />
  </Box>

  {/* Box2 - Should take space for one box (1 column) */}
  <Box
    p={6}
    borderWidth={0}
    borderRadius="0"
    boxShadow={cardShadow}
    bg={cardBg}
    w="full"
    gridColumn={{ base: "span 1", md: "span 1", lg: "span 1" }} // Occupies 1 column on all screens
  >
    <HStack>
     
      <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>Student Distribution</Text>
    </HStack>
    <Pie data={pieData} />
  </Box>
</SimpleGrid>
       

        

        {/* <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
          <Box p={6} borderWidth={0} borderRadius="" boxShadow={cardShadow} bg={cardBg} w="200%">
            <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
              Total Enrolled Trainees
            </Text>
            <Line data={lineData} />
          </Box>

          <Box p={5} borderWidth={0} borderRadius="0" boxShadow={cardShadow} bg={cardBg} w="100%">
            <HStack>
            <FaChartPie size={24} color="purple" />
            <Text fontSize="lg" fontWeight="bold">Student Distribution</Text> 
            </HStack>
            <Pie data={pieData} />
          </Box> */}

   
        {/* </SimpleGrid> */}

        <SimpleGrid columns={{ base: "span1", md: "span2", lg: "span3" }} spacing={4} w="full">

          <Box p={5} borderRadius="none" boxShadow={cardShadow} bg={cardBg} w="100%">
            <Text fontSize="xl" fontWeight="bold" mb={3}>📋 Ongoing Batches</Text>
            
            <VStack spacing={4} align="stretch">
              {batches.map((batch) => (
                <Box key={batch.id} p={4} bg={useColorModeValue("gray.100", "gray.800")} borderRadius="md" boxShadow="md">
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">{batch.name}</Text>
                    <Badge colorScheme="blue" fontSize="md">{batch.total} Students</Badge>
                  </HStack>
                  <Divider my={2} />
                  <HStack justify="space-between">
                    <HStack>
                      <Icon as={FaUserCheck} color="green.400" />
                      <Text>Present: {batch.present}</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaUserTimes} color="red.400" />
                      <Text>Absent: {batch.absent}</Text>
                    </HStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Dashboard;
