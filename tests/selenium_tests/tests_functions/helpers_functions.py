from selenium.webdriver.support.ui import Select

from time import sleep


def get_input(driver, By, index):
    try:
        ingredient_input = driver.find_element(
            By.XPATH, f'/html/body/div[1]/form/div/div[2]/div[{index}]/div/div/input'
        )
        return ingredient_input
    except:
        ingredient_input = driver.find_element(
            By.XPATH, f'/html/body/div[1]/div[2]/div[3]/div/form/div/div[2]/div[{index}]/div/div/input'
        )
        return ingredient_input


def fill_form(driver, By):
    name_input = driver.find_element(
        By.NAME, 'name'
    )
    name_input.clear()
    name_input.send_keys('novo nome')
    sleep(1)

    ingredient_input1 = get_input(driver, By, 1)
    ingredient_input1.clear()
    ingredient_input1.send_keys('novo primerio ingredient')
    sleep(1)

    ingredient_input2 = get_input(driver, By, 2)
    ingredient_input2.clear()
    ingredient_input2.send_keys('segundo ingredient alterado')
    sleep(1)

    try:
        delete_button_ingredient_input3 = driver.find_element(
            By.XPATH, '/html/body/div[1]/form/div/div[2]/div[3]/button'
        )
        delete_button_ingredient_input3.click()
    except:
        delete_button_ingredient_input3 = driver.find_element(
            By.XPATH, '/html/body/div[1]/div[2]/div[3]/div/form/div/div[2]/div[3]/button'
        )
        delete_button_ingredient_input3.click()
    sleep(1)

    preparation_input = driver.find_element(
        By.NAME, 'preparation'
    )
    preparation_input.clear()
    preparation_input.send_keys(
        'melhor jagar fora a receita fazer do melhor jeito o jeito mais pratico o jeito oldschool')
    sleep(1)

    driver.execute_script(
        "window.scrollTo(0, (document.body.scrollHeight/4.5));")
    sleep(1.5)

    difficulty_input = Select(driver.find_element(
        By.NAME, 'diffculty'
    ))
    difficulty_input.select_by_index(4)
    sleep(1)

    image_input = driver.find_element(By.NAME, 'img')
    image_input.send_keys(
        'C:\\Users\\Usuário\\OneDrive\\Área de Trabalho\\miniProjetos\\minha_receita\\public\\imagem_para_testes.jpg')
    sleep(3)

    durtation_input = Select(driver.find_element(
        By.NAME, 'duration'
    ))
    durtation_input.select_by_index(4)
    sleep(3)
