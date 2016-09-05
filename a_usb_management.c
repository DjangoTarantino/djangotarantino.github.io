#include <linux/module.h>  
#include <linux/sched.h>  
#include <linux/uaccess.h>  
#include <linux/proc_fs.h>  
#include <linux/fs.h>  
#include <linux/seq_file.h>  
#include <linux/slab.h>  
  
static char *str = NULL;  
  

static int my_proc_show(struct seq_file *m, void *v)  
{  
  seq_printf(m, "current kernel time is %ld\n", jiffies);  
  seq_printf(m, "str is %s\n", str);  
  return 0;  
}  
  
  
  
static ssize_t my_proc_write(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos)  
{  
  char *tmp = kzalloc((count+1), GFP_KERNEL);  
  if(!tmp)  
      return -ENOMEM;  
  if(copy_from_user(tmp, buffer, count))  
  {  
      kfree(tmp);  
      return EFAULT;  
  }  
  kfree(str);  
  str = tmp;  
  return count;  
}  
  
static int my_proc_open(struct inode *inode, struct file *file)  
{  
  return single_open(file, my_proc_show, NULL);  
}  

static struct file_operations my_fops = {  
  .owner   = THIS_MODULE,  
  .open    = my_proc_open,  
  .release = single_release,  
  .read    = seq_read,  
  .llseek  = seq_lseek,  
  .write   = my_proc_write,  
};  
  
static int __init my_init(void)  
{  
  struct proc_dri_entry *abcfile;  

  abcfile = proc_create("taran_proc", 0644, NULL, &my_fops);  
  if(!abcfile)  
      return -ENOMEM;  
  return 0;  
}  
  
static void __exit my_exit(void)  
{  
  remove_proc_entry("taran_proc", NULL);  
  kfree(str);  
}  
  
module_init(my_init);  
module_exit(my_exit);  
MODULE_LICENSE("GPL");  
MODULE_AUTHOR("ZhangN");  
// #include <linux/module.h>  
// #include <linux/sched.h>  
// #include <linux/uaccess.h>  
// #include <linux/proc_fs.h>  
// #include <linux/fs.h>  
// #include <linux/seq_file.h>  
// #include <linux/slab.h> 

// MODULE_LICENSE("GPL");  
// MODULE_AUTHOR("Django");  

// static char *str = NULL;  
// struct proc_dir_entry *proc_file;

// static int my_proc_show(struct seq_file *m, void *v)  
// {  
//   printk(KERN_ALERT "current kernel time is %ld\n", jiffies);
//   seq_printf(m, "current kernel time is %ld\n", jiffies);  
//   seq_printf(m, "str is %s\n", str);  
//   return 0;  
// }  

// static ssize_t my_proc_write(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos)  
// {  
//   char *tmp = kzalloc((count+1), GFP_KERNEL);  
//   if(!tmp)  
//     return -ENOMEM;  
//   if(copy_from_user(tmp, buffer, count))  
//   {  
//     kfree(tmp);  
//     return EFAULT;  
//   }  
//   kfree(str);  
//   str = tmp;  
//   return count;  
// }  


// static int my_proc_open(struct inode *inode, struct file *file)  
// {  
//   return single_open(file, my_proc_show, NULL);  
// }  

// static struct file_operations proc_file_fops = {  
//   .owner   = THIS_MODULE,  
//   .open    = my_proc_open,  
//   .release = single_release,  
//   .read    = seq_read,  
//   .llseek  = seq_lseek,  
//   .write   = my_proc_write,  
// }; 

// static int __init um_proc_init(void) {  
//   proc_file = proc_create("django_um_proc", S_IRUGO, proc_dir, &proc_file_fops);  
//   printk(KERN_ALERT "1current kernel time is %ld\n", jiffies);
//   if(!proc_file)  
//     return -ENOMEM;  
//   printk(KERN_ALERT "3current kernel time is %ld\n", jiffies);
//   return 0;  
// }  

// static void __exit um_proc_exit(void) {  
//   printk(KERN_ALERT "2current kernel time is %ld\n", jiffies);
//   remove_proc_entry("django_um_proc", NULL); 
// } 

// module_init(um_proc_init);  
// module_exit(um_proc_exit);