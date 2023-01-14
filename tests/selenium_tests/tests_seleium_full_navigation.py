from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.firefox.options import Options
from webdriver_manager.firefox import GeckoDriverManager

from selenium.webdriver.common.by import By
import os
from time import sleep

from tests_functions.home_navigation import home_navigation
from tests_functions.home_navigation import click_link_home
from tests_functions.my_recipe_list import my_reciep_list_navigate_and_buttons
from tests_functions.my_recipe_list import click_myRecipe_link
from tests_functions.send_recipe import send_recipe
service = Service(GeckoDriverManager().install())

options = Options()
# options.add_argument('--headless')
options.add_argument('window-size=400,800')

driver = webdriver.Firefox(service=service, options=options)

driver.get('http://localhost:3000')
sleep(3)

home_navigation(driver, By)
my_reciep_list_navigate_and_buttons(driver, By)

click_link_home(driver, By)
sleep(2)
click_myRecipe_link(driver, By)
sleep(2)
send_recipe(driver, By)
sleep(2)

os.remove('/tests/selenium/server_for_test/public')
