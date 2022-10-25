<?php

class User
{
    private $UserID;
    private $Name;
    private $Surname;
    private $Email;

    public function __construct($UserID, $Name, $Surname, $Email)
    {
        $this->UserID = $UserID;
        $this->Name = $Name;
        $this->Surname = $Surname;
        $this->Email = $Email;
    }

    //Generate get and set functions

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->Name;
    }

    /**
     * @param mixed $Name
     */
    public function setName($Name): void
    {
        $this->Name = $Name;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->Email;
    }

    /**
     * @param mixed $Email
     */
    public function setEmail($Email): void
    {
        $this->Email = $Email;
    }

    /**
     * @return mixed
     */
    public function getSurname()
    {
        return $this->Surname;
    }

    /**
     * @param mixed $Surname
     */
    public function setSurname($Surname): void
    {
        $this->Surname = $Surname;
    }

    /**
     * @return mixed
     */
    public function getUserID()
    {
        return $this->UserID;
    }

    /**
     * @param mixed $UserID
     */
    public function setUserID($UserID): void
    {
        $this->UserID = $UserID;
    }
}

?>