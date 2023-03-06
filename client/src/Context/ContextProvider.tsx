import React, { useState, useEffect, createContext } from 'react';
import { Student } from './@types.students';
import { Campus, initialCampusInterface } from './@types.campuses';
import type { PropsWithChildren } from 'react';


type combinedContext = {
  students: Student[];
  campuses: Campus[];
  setContext?: any;
  context?: any;
};

export const Context = createContext<combinedContext>({} as combinedContext);

const ContextProvider = ({ children }: PropsWithChildren) => {
  const [context, setContext] = useState<combinedContext>({
    students: [],
    campuses: [],
  });

  const addStudent = (student: Student) => {
    const { firstName, lastName, email, imageUrl, gpa } = student;
    const newStudent: Student = {
      firstName,
      lastName,
      email,
      imageUrl,
      gpa,
    };
    setContext({
      campuses: [...context.campuses],
      students: [...context.students, newStudent],
    });
  };

  // const addCampus = (campus: Campus) => {
  //   const { name, imageUrl, address, description } = campus;
  //   const newCampus: Campus = {
  //     id,
  //     createdAt,
  //     updatedAt,
  //     name,
  //     imageUrl,
  //     address,
  //     description,
  //   };
  //   setContext({
  //     students: [...context.students],
  //     campuses: [...context.campuses, newCampus],
  //   });
  // };

  const value = {
    students: context.students,
    campuses: context.campuses,
    context,
    addStudent,
    setContext,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
