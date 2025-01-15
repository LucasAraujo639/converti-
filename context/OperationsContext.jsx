import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Crear el contexto de operaciones
const OperationsContext = createContext();

// Hook para acceder fácilmente al contexto
export const useOperations = () => {
  return useContext(OperationsContext);
};

// El proveedor del contexto
export const OperationsProvider = ({ children }) => {
  const [operations, setOperations] = useState([]);
  const [showMessagge, setShowMessagge] = useState(false);

  // Cargar operaciones almacenadas al iniciar
  useEffect(() => {
    const loadOperationsFromStorage = async () => {
      try {
        // Recuperar las operaciones desde AsyncStorage
        const storedOperations = await AsyncStorage.getItem("operations");
        const parsedOperations = storedOperations
          ? JSON.parse(storedOperations)
          : [];
        setOperations(parsedOperations);
      } catch (error) {
        console.error("Error al cargar las operaciones:", error);
      }
    };

    loadOperationsFromStorage();
  }, []);

  // Guardar operaciones en AsyncStorage
  const saveOperationsToStorage = async (operationsToSave) => {
    try {
      await AsyncStorage.setItem(
        "operations",
        JSON.stringify(operationsToSave)
      );
    } catch (error) {
      console.error("Error al guardar las operaciones:", error);
    }
  };

  // Función para obtener el siguiente ID desde AsyncStorage
  const getNextId = async () => {
    try {
      const lastId = await AsyncStorage.getItem("lastId");
      let newId = 1;

      // Si ya existe un ID anterior, incrementamos
      if (lastId !== null) {
        newId = parseInt(lastId, 10) + 1;
      }

      // Almacenamos el nuevo ID como el último ID
      await AsyncStorage.setItem("lastId", newId.toString());

      return newId;
    } catch (error) {
      console.error("Error al obtener el siguiente ID:", error);
      return 1; // Si ocurre un error, comenzamos desde 1
    }
  };

  // Función para agregar una nueva operación
  const addOperation = async (operation) => {
    const newId = await getNextId(); // Obtener el siguiente ID
    const newOperation = { ...operation, id: newId }; // Asignar el ID

    setOperations((prevOperations) => {
      console.log(prevOperations.id);
      console.log(newOperation.id);
      const updatedOperations = [...prevOperations, newOperation];
      saveOperationsToStorage(updatedOperations);
      return updatedOperations;
    });
  };

  // Función para actualizar una operación
  const updateOperation = (id, updatedData) => {
    setOperations((prevOperations) => {
      const updatedOperations = prevOperations.map((operation) => {
        // Comparación de los ids y actualización de la operación
        const isMatch = operation.id === parseInt(id, 10);
        return isMatch ? { ...operation, ...updatedData } : operation;
      });

      saveOperationsToStorage(updatedOperations); // Guardar los cambios en el almacenamiento
      return updatedOperations;
    });
  };

  // Función para eliminar una operación
  const deleteOperation = (id) => {
    setOperations((prevOperations) => {
      const updatedOperations = prevOperations.filter(
        (operation) => operation.id !== parseInt(id, 10)
      );
      saveOperationsToStorage(updatedOperations);
      return updatedOperations;
    });
  };

  // Función para obtener una operación por ID
  const getOperationById = (id) => {
    return operations.find((op) => op.id === parseInt(id, 10)); // necesario parsear para comparar int con int
  };

  const getAveragePurchasePriceAction = (name) => {
    // Filtrar las operaciones de tipo 'compra' con el nombre indicado
    const purchaseOperations = operations.filter(
      (op) => op.tipo === "compra" && op.titulo === name
    );

    // Si no hay operaciones, el promedio es 0
    if (purchaseOperations.length === 0) {
      return 0;
    }

    // Sumar precioTotalUSD y cantidades
    const totalUSD = purchaseOperations.reduce(
      (acc, op) => acc + parseFloat(op.precioTotalUSD),
      0
    );

    const totalQuantity = purchaseOperations.reduce(
      (acc, op) => acc + parseFloat(op.cantidad),
      0
    );
    console.log("totalUSD: ", totalUSD);
    console.log("totalquantity: ", totalQuantity);
    // Calcular el promedio
    return totalQuantity > 0 ? totalUSD / totalQuantity : 0;
  };

  return (
    <OperationsContext.Provider
      value={{
        operations,
        addOperation,
        updateOperation,
        deleteOperation,
        getOperationById,
        getAveragePurchasePriceAction,
        showMessagge,
        setShowMessagge,
      }}
    >
      {children}
    </OperationsContext.Provider>
  );
};
